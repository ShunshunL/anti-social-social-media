import React from "react"
import { useSignUpPageStyles } from "../styles"
import SEO from "../components/shared/Seo"
import { Card, TextField, Button, Typography } from "@material-ui/core"
import { Link, useHistory } from "react-router-dom"
import { authContext } from "../auth"
import { useForm } from 'react-hook-form'
import validator from 'validator';

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
  const { register, handleSubmit, errors } = useForm({ mode: 'onBlur' })

  // async function handleSubmit(event) {
  //   event.preventDefault()
  //   await signUpWithEmailAndPassword(values)
  //   history.push('/')
  // }

  function onSubmit(data) {
    console.log(data)
  }
  
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
                  pattern: /^[a-zA-Z0-9_.]*$/
                })}
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
                  minLength: 6
                })}
                variant="filled"
                label="Password"
                type="password"
                margin="dense"
                className={classes.textField}
                autoComplete="new-password"
              />
              {errors.password && <span>Password needs to be at least 6 characters long.</span>}
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

export default SignUpPage
