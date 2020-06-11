import React from "react"
import { useSignUpPageStyles } from "../styles"
import SEO from "../components/shared/Seo"
import { Card, TextField, Button, Typography, InputAdornment } from "@material-ui/core"
import { Link, useHistory } from "react-router-dom"
import { authContext } from "../auth"
import { useForm } from 'react-hook-form'
import validator from 'validator';
import { HighlightOff, CheckCircleOutline } from '@material-ui/icons'
import { useApolloClient } from "@apollo/react-hooks"
import { CHECK_USERNAME } from "../graphql/queries"

function SignUpPage() {
  const classes = useSignUpPageStyles()
  const { signUpWithEmailAndPassword } = React.useContext(authContext)
  // const [values, setValues] = React.useState({
  //   email: '',
  //   name: '',
  //   username: '',
  //   password: ''
  // })
  const history = useHistory()
  const { register, handleSubmit, errors, formState } = useForm({ mode: 'onBlur' })
  const [error, setError] = React.useState('')
  const client = useApolloClient()

  async function onSubmit(data) {
    console.log(data)
    try{
      setError('')
      await signUpWithEmailAndPassword(data)
      setTimeout(() => history.push('/'), 0)
    } catch(error) {
      console.error('Error signing up', error)
      handleError(error)
    }
  }

  function handleError(error) {
    if (error.message.includes("users_username_key")) {
      setError('Username already taken')
    } else if (error.code.includes('auth')) {
      setError(error.message)
    }
  }

  async function validateUsername(username) {
    const variables = {username}
    const response = await client.query({
      query: CHECK_USERNAME,
      variables
    })
    const isUsernameNotTaken = response.data.users.length === 0
    return isUsernameNotTaken
  }

  const errorIcon = (
    <InputAdornment>
      <HighlightOff style={{ color: 'red', height: 30, width: 30 }} />
    </InputAdornment>
  )

  const validIcon = (
    <InputAdornment>
      <CheckCircleOutline style={{ color: '#00b100', height: 30, width: 30 }} />
    </InputAdornment>
  )
  
  return (
    <>
      <SEO title="Sign up" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <div className={classes.cardHeader} />
            <Typography className={classes.cardHeaderSubHeader}>
              Sign up to see photos and videos from your friends.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField 
                name="email"
                fullWidth
                inputRef={register({
                  required: true,
                  validate: input => validator.isEmail(input)
                })}
                InputProps={{
                  endAdornment: errors.email ? errorIcon : formState.touched.email && validIcon
                }}
                variant="filled"
                label="Email"
                type="email"
                margin="dense"
                className={classes.textField}
              />
              <TextField 
                name="name"
                fullWidth
                inputRef={register({
                  required: true,
                  minLength: 3,
                  maxLength: 20
                })}
                InputProps={{
                  endAdornment: errors.name ? errorIcon : formState.touched.name && validIcon
                }}
                variant="filled"
                label="Full Name"
                margin="dense"
                className={classes.textField}
              />
              <TextField 
                name="username"
                fullWidth
                inputRef={register({
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                  pattern: /^[a-zA-Z0-9_.]*$/,
                  validate: async (input) => await validateUsername(input)
                })}
                InputProps={{
                  endAdornment: errors.username ? errorIcon : formState.touched.username && validIcon
                }}
                variant="filled"
                label="Username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField 
                name="password"
                fullWidth
                inputRef={register({
                  required: true,
                  minLength: 5
                })}
                InputProps={{
                  endAdornment: errors.password ? errorIcon : formState.touched.password && validIcon
                }}
                variant="filled"
                label="Password"
                type="password"
                margin="dense"
                className={classes.textField}
                autoComplete="new-password"
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Sign Up   
              </Button>
            </form>
            <AuthError error={error} />
          </Card>
          <Card className={classes.loginCard}>
            <Typography align="right" variant="body2">
              Have an account?
            </Typography>
            <Link to="/accounts/login">
              <Button color="primary" className={classes.loginButton}>
                Log in
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  )
}

export function AuthError({ error }) {
  return Boolean(error) && (
    <Typography align="center" gutterBottom variant="body2" style={{ color: 'red' }}>
      {error}
    </Typography>
  )
}

export default SignUpPage
