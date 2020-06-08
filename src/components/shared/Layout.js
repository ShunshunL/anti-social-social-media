import React from "react"
import { useLayoutStyles } from "../../styles"
import SEO from '../shared/Seo'
import Navbar from '../shared/Navbar'

function Layout({ minNav = false, children, title, marginTop = 60 }) {
  const classes = useLayoutStyles()

  return (
    <section className={classes.section} style={{marginTop}}>
      <SEO title={title} />
      <Navbar minNav={minNav} />
      <main className={classes.main}>
        <section className={classes.childrenWrapper}>
          <div className={classes.children}>
            {children}
          </div>
        </section>
      </main>
    </section>
  )
}

export default Layout
