import React from "react"
import { useEditProfilePageStyles } from "../styles"
import Layout from '../components/shared/Layout'
import { IconButton, Hidden, Drawer, List, ListItem, ListItemText, Typography, TextField, Button } from "@material-ui/core"
import { Menu } from '@material-ui/icons'
import ProfilePicture from '../components/shared/ProfilePicture'
import { UserContext } from "../App"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_EDIT_USER } from "../graphql/queries"
import LoadingScreen from "../components/shared/LoadingScreen"
import { useForm } from 'react-hook-form'
import handleImageUpload from "../utils/handleImageUpload"
import { EDIT_USER_AVATAR } from "../graphql/mutation"
import validator from 'validator'

function EditProfilePage({ history }) {
  const classes = useEditProfilePageStyles()
  const [showSideTabs, setSideTabs] = React.useState(false)
  const { currentUserId } = React.useContext(UserContext)
  const variables = { id: currentUserId }
  const {data, loading} = useQuery(GET_EDIT_USER, { variables })

  if (loading) return <LoadingScreen />

  function handleToggleSideTabs() {
    setSideTabs(prev => !prev)
  }

  const options = [
    "Edit Profile",
    "Change Password",
    "Apps and Websites",
    "Email and SMS",
    "Push Notifications",
    "Manage Contacts",
    "Privacy and Security",
    "Login Activity",
    "Emails from Instagram"
  ]

  function handleSelected(index) {
    switch (index) {
      case 0: 
        return history.location.pathname.includes('edit')
      default: 
        break
    }
  }

  function handleListClick(index) {
    switch (index) {
      case 0: 
        history.push('/accounts/edit')
        break
      default: 
        break
    }
  }

  const sideMenu = (
    <List>
      {options.map((option, i) => (
        <ListItem key={option} button selected={handleSelected(i)} onClick={() => handleListClick(i)} classes={{ selected: classes.listItemSelected, button: classes.listItemButton }}>
          <ListItemText primary={option} />
        </ListItem>
      ))}
    </List>
  )

  return (
    <Layout title="Edit Profile">
      <section className={classes.section}>
        <IconButton edge="start" onClick={handleToggleSideTabs} className={classes.menuButton}>
          <Menu />
        </IconButton>
        <nav>
          <Hidden smUp implementation="css">
            <Drawer variant="temporary" anchor="left" open={showSideTabs} onClose={handleToggleSideTabs} >
              {sideMenu}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css" className={classes.permanentDrawerRoot}>
            <Drawer variant="permanent" classes={{ paper: classes.permanentDrawerPaper, root: classes.permanentDrawerRoot }}>
              {sideMenu}
            </Drawer>
          </Hidden>
        </nav>
        <main>
          {history.location.pathname.includes('edit') && <EditUserInfo user={data.users_by_pk} />}
        </main>
      </section>
    </Layout>
  )
}

function EditUserInfo({ user }) {
  const classes = useEditProfilePageStyles()
  const {register, handleSubmit} = useForm({ mode: 'onBlur' })
  const [editUserAvatar] = useMutation(EDIT_USER_AVATAR)
  const [avatar, setAvatar] = React.useState(user.profile_image)

  async function handleProfilePic(event) {
     const url = await handleImageUpload(event.target.files[0])
     console.log({url})
    const variables = { id: user.id, profileImage: url }
    await editUserAvatar({ variables })
    setTimeout(() => (setAvatar(url)), 0)
  }

  function onSubmit(data) {
    console.log({data})
  } 

  return (
    <section className={classes.container}>
      <div className={classes.pictureSectionItem}>
        <ProfilePicture size={38} image={avatar} />
        <div className={classes.justifySelfStart}>
          <Typography className={classes.typography}>
            {user.username}
          </Typography>
          <input accept="image/*" id="image" type="file" style={{ display: 'none' }} onChange={handleProfilePic} />
          <label htmlFor="image">
            <Typography color="primary" variant="body2" className={classes.typographyChangePic}>
              Change Profile Photo
            </Typography>
          </label>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <SectionItem text="Name" name="name" inputRef={register({ required: true, minLength: 3, maxLength: 20 })} formItem={user.name} />
        <SectionItem text="Username" name="username" inputRef={register({ required: true, pattern: /^[a-zA-Z0-9_.]*$/, minLength: 3, maxLength: 20 })} formItem={user.username} />
        <SectionItem text="Website" name="website" inputRef={register({ validate: input => Boolean(input) ? validator.isURL(input, { protocols: ['http', 'https'], require_protocol: true }) : true })} formItem={user.website} />
        <div className={classes.sectionItem}>
          <aside>
            <Typography className={classes.typography}>
              Bio
            </Typography>
          </aside>
          <TextField name="bio" inputRef={register({ maxLength: 120 })} variant="outlined" multiline rowsMax={3} rows={3} fullWidth defaultValue={user.bio} />
        </div>
        <div className={classes.sectionItem}>
          <div />
          <Typography color="textSecondary" className={classes.justifySelfStart}>
            Personal Information
          </Typography>
        </div>
        <SectionItem name="email" inputRef={register({ required: true, validate: input => validator.isEmail(input) })} text="Email" formItem={user.email} type="email" />
        <SectionItem name="phoneNumber" inputRef={register({ validate: input => Boolean(input) ? validator.isMobilePhone(input) : true })} text="Phone Number" formItem={user.phone_number} />
        <div className={classes.sectionItem}>
          <div />
          <Button type="submit" variant="contained" color="primary" className={classes.justifySelfStart}>
            Submit
          </Button>
        </div>
      </form>
    </section>
  )
}

function SectionItem({ type="text", text, formItem, inputRef, name }) {
  const classes = useEditProfilePageStyles()

  return (
    <div className={classes.sectionItemWrapper}>
      <aside>
        <Hidden xsDown>
          <Typography className={classes.typography} align="right">
            {text}
          </Typography>
        </Hidden>
        <Hidden smUp>
          <Typography className={classes.typography}>
            {text}
          </Typography>
        </Hidden>
      </aside>
      <TextField name={name} inputRef={inputRef}  variant="outlined" fullWidth defaultValue={formItem} type={type} inputProps={{ className: classes.textFieldInput}} className={classes.textField} />
    </div>
  )
}

export default EditProfilePage
