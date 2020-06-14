import React, { useContext } from "react"
import { useProfilePictureStyles } from "../../styles"
import {Person} from '@material-ui/icons'
import handleImageUpload from "../../utils/handleImageUpload"
import { useMutation } from "@apollo/react-hooks"
import { EDIT_USER_AVATAR } from "../../graphql/mutation"
import { UserContext } from "../../App"

function ProfilePicture({ size, image, isOwner}) {
  const classes = useProfilePictureStyles({ size, isOwner })
  const inputRef = React.useRef()
  const [editUserAvatar] = useMutation(EDIT_USER_AVATAR)
  const [avatar, setAvatar] = React.useState(image)
  const { currentUserId } = useContext(UserContext)


  function openFileInput() {
    inputRef.current.click()
  }

  async function handleUpdateProfilePic(event) {
    const url = await handleImageUpload(event.target.files[0], 'avatar')
    const variables = { id: currentUserId, profileImage: url }
    await editUserAvatar({ variables })
    setTimeout(() => (setAvatar(url)), 0)
 }

  return (
    <section className={classes.section}>
      <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={handleUpdateProfilePic} />
      {image ? ( 
        <div onClick={isOwner ? openFileInput : () => null} className={classes.wrapper}>
          <img src={avatar} alt="user profile" className={classes.image} />
        </div>
      ) : (
        <div className={classes.wrapper}>
          <Person className={classes.person} />
        </div>
      )}
    </section>
  )
}

export default ProfilePicture
