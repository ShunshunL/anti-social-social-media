import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import React, { useState, useEffect } from "react";
import defaultUserImg  from './images/default-user-image.jpg'
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER } from "./graphql/mutation";

const provider = new firebase.auth.GoogleAuthProvider();

// Find these options in your Firebase console
firebase.initializeApp({
  apiKey: "AIzaSyA2RQf2pyWCVRMtjdZbKdWOOEkPd9URang",
  authDomain: "anti-social-social-media.firebaseapp.com",
  databaseURL: "https://anti-social-social-media.firebaseio.com",
  projectId: "anti-social-social-media",
  storageBucket: "anti-social-social-media.appspot.com",
  messagingSenderId: "139151326399",
  appId: "1:139151326399:web:5e97a8a20e80cd812bda0a"
});

export const authContext = React.createContext()

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({ status: "loading" });
  const [createUser] = useMutation(CREATE_USER)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims["https://hasura.io/jwt/claims"];

        if (hasuraClaim) {
          setAuthState({ status: "in", user, token });
        } else {
          // Check if refresh is required.
          const metadataRef = firebase
            .database()
            .ref(`metadata/${user.uid}/refreshTime`);

          metadataRef.on("value", async (data) => {
            if(!data.exists) return
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: "in", user, token });
          });
        }
      } else {
        setAuthState({ status: "out" });
      }
    });
  }, []);

  const signInWithGoogle = async () => {
    const data = await firebase.auth().signInWithPopup(provider);
    if (data.additionalUserInfo.isNewUser) {
      const { uid, displayName, email, photoURL } = data.user
      const username = `${displayName.replace(/\s+/g, "")}${uid.slice(-5)}`
      const variables = {
        userId: uid,
        name: displayName,
        username,
        email,
        bio: "",
        website: "",
        phoneNumber: "",
        profileImage: photoURL
      }
      await createUser({ variables })
    }
  };

  const signInWithEmailAndPassword = async (email, password) => {
    const data = await firebase.auth().signInWithEmailAndPassword(email, password)
    return data
  } 

  const signUpWithEmailAndPassword = async (formData) => {
    const data = await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
    if (data.additionalUserInfo.isNewUser) {
      const variables = {
        userId: data.user.uid,
        name: formData.name,
        username: formData.username,
        email: data.user.email,
        bio: "",
        website: "",
        phoneNumber: "",
        profileImage: defaultUserImg
      }
      await createUser({ variables })
    }
  }

  const signOut = async () => {
    setAuthState({ status: "loading" });
    await firebase.auth().signOut();
    setAuthState({ status: "out" });
  };

  const updateEmail = async (email) => {
    await authState.user.updateEmail(email)
  }

  if (authState.status === "loading") {
     return null;
  } else {
    return (
      <authContext.Provider value={{authState, signInWithGoogle, signOut, signUpWithEmailAndPassword, signInWithEmailAndPassword, updateEmail }}>
        {children}
      </authContext.Provider>
    );
  }

}

export default AuthProvider