import React from "react"
import { useEditProfilePageStyles } from "../styles"
import Layout from '../components/shared/Layout'
import { IconButton, Hidden, Drawer, List, ListItem, ListItemText } from "@material-ui/core"
import { Menu } from '@material-ui/icons'
import { defaultCurrentUser } from "../data"

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
    
  )
}

export default EditProfilePage
