import React from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { makeStyles, Dialog, AppBar, Toolbar, Typography, Button, Divider, Paper, Avatar, TextField, InputAdornment } from '@material-ui/core'
import { ArrowBackIos, PinDrop } from '@material-ui/icons'
import { UserContext } from '../../App'
import serialize from '../../utils/serialize'
import handleImageUpload from '../../utils/handleImageUpload'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_POST } from '../../graphql/mutation'

const useAddPostDialogStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    background: '#fff !important',
    color: 'black !important',
    display: 'flex',
    justifyContent: 'space-between',
    height: '54px !important'
  },
  toolBar: {
    minHeight: '54px !important'
  },
  title: {
    flex: 1,
    fontWeight: 600
  },
  paper: {
    display: 'flex',
    alignItems: 'flex-start',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  editor: {
    flex: 1
  },
  avatarLarge: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  input: {
    padding: '10px !important',
    fontSize: '14px !important'
  },
  root: {
    border: '1px solid #e6e6e6',
    marginTop: '10px !important'
  },
  underline: {
    '&::before': {
      border: 'none !important'
    },
    '&::after': {
      border: 'none !important'
    },
    '&:hover:before': {
      border: 'none !important'
    }
  }
}))

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: "" }]
  }
]

function AddPostDialog({ postImg, handleClose }) {
  const classes = useAddPostDialogStyles()
  // Create a Slate editor object that won't change across renders.
  const editor = React.useMemo(() => withReact(createEditor()), [])
  // Keep track of state for the value of the editor.
  const [value, setValue] = React.useState(initialValue)
  const {currentUser, currentUserId} = React.useContext(UserContext)
  const [location, setLocation] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [createPost] = useMutation(CREATE_POST)

  // add an api call in this? 
  async function handleSharePost() {
    setIsSubmitting(true)
    const url = await handleImageUpload(postImg)
    const variables = {
      userId: currentUserId,
      location,
      caption: serialize({ children: value }),
      image: url
    }
    await createPost({ variables })
    setIsSubmitting(false)
    window.location.reload()
  }
  
  return (
    <Dialog open fullScreen onClose={handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <ArrowBackIos onClick={handleClose} />
          <Typography align="center" variant="body1" className={classes.title}>
            New Post
          </Typography>
          <Button onClick={handleSharePost} color="primary" disabled={isSubmitting}>Submit</Button>
        </Toolbar>
      </AppBar>
      <Divider />
      <Paper className={classes.paper}>
        <Avatar src={currentUser.profile_image} />
        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
          <Editable className={classes.editor} placeholder="Write your caption..." />
        </Slate>
        <Avatar src={URL.createObjectURL(postImg)} className={classes.avatarLarge} variant="square" />
      </Paper>
      <TextField onChange={event => setLocation(event.target.value)} fullWidth placeholder="Location" InputProps={{ classes: {root: classes.root, input: classes.input, underline: classes.underline }, startAdornment: (<InputAdornment><PinDrop /></InputAdornment>)}} />
    </Dialog>
  )
}

export default AddPostDialog