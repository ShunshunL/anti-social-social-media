import React from "react"
import { useLoadingScreenStyles } from "../../styles"
import { LoadingLargeIcon } from '../../icons'

function Spinner() {
  const classes = useLoadingScreenStyles()

  return (
    <section className={classes.section}>
      <span>
        <LoadingLargeIcon />
      </span>
    </section>
  )
}

export default Spinner