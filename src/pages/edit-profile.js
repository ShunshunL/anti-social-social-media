import React from "react"
import { useEditProfilePageStyles } from "../styles"
import Layout from '../components/shared/Layout'
import { IconButton, Hidden, Drawer, List, ListItem, ListItemText, Typography, TextField, Button } from "@material-ui/core"
import { Menu } from '@material-ui/icons'
import { defaultCurrentUser } from "../data"
import ProfilePicture from '../components/shared/ProfilePicture'

function EditProfilePage({ history }) {
  const classes = useEditProfilePageStyles()
  const [showSideTabs, setSideTabs] = React.useState(false)

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
            <Drawer variant="temporary" anchor="left" open={showSideTabs} onClose={handleToggleSideTabs} classes={{ paperAnchorDockedLeft: classes.temporaryDrawer }}>
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
          {history.location.pathname.includes('edit') && <EditUserInfo user={defaultCurrentUser} />}
        </main>
      </section>
    </Layout>
  )
}

function EditUserInfo({ user }) {
  const classes = useEditProfilePageStyles()

  return (
    <section className={classes.container}>
      <div className={classes.pictureSectionItem}>
        <ProfilePicture size={38} user={user} />
        <div className={classes.justifySelfStart}>
          <Typography className={classes.typography}>
            {user.username}
          </Typography>
          <Typography color="primary" variant="body2" className={classes.typographyChangePic}>
            Change Profile Photo
          </Typography>
        </div>
      </div>
      <form className={classes.form}>
        <SectionItem text="Name" formItem={user.name} />
        <SectionItem text="Username" formItem={user.username} />
        <SectionItem text="Website" formItem={user.website} />
        <div className={classes.sectionItem}>
          <aside>
            <Typography className={classes.typography}>
              Bio
            </Typography>
          </aside>
          <TextField variant="outlined" multiline rowsMax={3} rows={3} fullWidth value={user.bio} />
        </div>
        <div className={classes.sectionItem}>
          <div />
          <Typography color="textSecondary" className={classes.justifySelfStart}>
            Personal Information
          </Typography>
        </div>
        <SectionItem text="Email" formItem={user.email} type="email" />
        <SectionItem text="Phone Number" formItem={user.phone_number} />
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

function SectionItem({ type="text", text, formItem }) {
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
      <TextField variant="outlined" fullWidth value={formItem} type={type} inputProps={{ className: classes.textFieldInput}} className={classes.textField} />
    </div>
  )
}

export default EditProfilePage
