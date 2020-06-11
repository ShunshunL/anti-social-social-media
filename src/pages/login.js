import React from "react"
import { useLoginPageStyles } from "../styles"
import SEO from "../components/shared/Seo"
import { Card, CardHeader, TextField, Button, Typography, InputAdornment } from "@material-ui/core"
import { Link, useHistory } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { authContext } from "../auth"
import validator from 'validator';
import { useApolloClient } from "@apollo/react-hooks"
import { GET_USER_EMAIL } from "../graphql/queries"
import { AuthError } from './signup'


function LoginPage() {
  const classes = useLoginPageStyles()
  const { register, handleSubmit, watch, formState } = useForm({ mode: 'onBlur'})
  const [showPassword, setTogglePassword] = React.useState(false)
  const isPasswordNotEmpty = Boolean(watch('password'))
  const { signInWithEmailAndPassword } = React.useContext(authContext)
  const history = useHistory()
  const client = useApolloClient()
  const [error, setError] = React.useState('')


  async function onSubmit({ authInput, password }) {
    try{
      setError('')
      // console.log(data)
      if (!validator.isEmail(authInput)) {
        authInput = await getUserEmail(authInput)
      }
      console.log(authInput)
      await signInWithEmailAndPassword(authInput, password)
      setTimeout(() => history.push('/'), 0) 
    } catch(error) {
      console.error('error signing up', error)
      handleError(error)
    }
  }

  function handleError(error) {
    if (error.code.includes('auth')) {
      setError(error.message)
    }
  }

  async function getUserEmail(input) {
    const variables = { input }
    const response = await client.query({
      query: GET_USER_EMAIL,
      variables
    })
    const email = response.data.users[0]?.email || "not@email.co"
    return email
  }

  function togglePassword() {
    setTogglePassword(prev => !prev)
  }

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField 
                name="authInput"
                inputRef={register({
                  required: true,
                  minLength: 3
                })}
                fullWidth
                variant="filled"
                label="Username, email, or phone"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField 
                name="password"
                inputRef={register({
                  required: true,
                  minLength: 5
                })}
                InputProps={{
                  endAdornment: isPasswordNotEmpty && (
                    <InputAdornment>
                      <Button onClick={togglePassword}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputAdornment>
                  )
                }}
                fullWidth
                variant="filled"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Log In   
              </Button>
            </form>
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <LoginWithGoogle color="secondary" />
            <AuthError error={error} />
            <Button fullWidth color="secondary">
              <Typography variant="caption">
                Forgot password?
              </Typography>
            </Button>
          </Card>
          <Card className={classes.signUpCard}>
            <Typography align="right" variant="body2">
              Don't have an account?
            </Typography>
            <Link to="/accounts/emailsignup">
              <Button color="primary" className={classes.signUpButton}>
                Sign up
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  )
}

export function LoginWithGoogle({ color, variant }) {
  const classes = useLoginPageStyles();
  const { signInWithGoogle } = React.useContext(authContext);
  const [error, setError] = React.useState("");
  const history = useHistory();

  async function handleLogInWithGoogle() {
    try {
      await signInWithGoogle();
      setTimeout(() => history.push("/"), 0);
    } catch (error) {
      console.error("Error logging in with Google", error);
      setError(error.message);
    }
  }

  return (
    <>
      <Button
        onClick={handleLogInWithGoogle}
        fullWidth
        color={color}
        variant={variant}
      >
       <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google icon" className={classes.googleIcon}/>
        Log In with Google
      </Button>
      <AuthError error={error} />
    </>
  );
}


export default LoginPage
