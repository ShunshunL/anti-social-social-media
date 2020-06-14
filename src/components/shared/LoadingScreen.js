import React from "react"
import { useLoadingScreenStyles } from "../../styles"
import logo from '../../images/icon.png'

function LoadingScreen() {
  const classes = useLoadingScreenStyles()

  return (
    <section className={classes.section}>
      <span>
        <img style={{ width: 100, marginBottom: 50}} src={logo} alt='logo' />
      </span>
    </section>
  )
}

export default LoadingScreen
