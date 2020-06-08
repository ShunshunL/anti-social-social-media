import React from "react"
// used react-helmet to change info
import Helmet from 'react-helmet'

function SEO({ title }) {
  const titleText = title ? `${title} · AntiSocialSocialMedia` : "AntiSocialSocialMedia"
  
  return (
    <Helmet>
      <title>{titleText}</title>
    </Helmet>
  )
}

export default SEO
