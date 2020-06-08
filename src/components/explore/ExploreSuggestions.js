import React from "react"
import { useExploreSuggestionsStyles } from "../../styles"
import { Hidden, Typography } from "@material-ui/core"
import FollowSuggestions from '../shared/FollowSuggestions'

function ExploreSuggestions() {
  const classes = useExploreSuggestionsStyles()

  return (
    <Hidden smDown>
      <div className={classes.container}>
        <Typography color="textSecondary" variant="subtitle1" component="h2" className={classes.typography}>
          Discover 
        </Typography>
        <FollowSuggestions hideHeader />
      </div>
    </Hidden>
  )
}

export default ExploreSuggestions
