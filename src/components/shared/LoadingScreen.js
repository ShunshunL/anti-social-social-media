import React from "react"
import { useLoadingScreenStyles } from "../../styles"
// import { LoadingLargeIcon } from '../../icons'

function LoadingScreen() {
  const classes = useLoadingScreenStyles()

  return (
    <section className={classes.section}>
      <span>
        {/* <LoadingLargeIcon /> */}
        <img style={{width: 300, marginBottom: 50}} src="https://fontmeme.com/permalink/200607/6b50f32a2790edff0cbdefd02aa12b9c.png" alt='logo' />
      </span>
    </section>
  )
}

export default LoadingScreen
