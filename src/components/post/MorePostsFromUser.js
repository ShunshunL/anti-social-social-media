import React from "react"
import { useMorePostsFromUserStyles } from "../../styles"
import { Typography } from "@material-ui/core"
import { LoadingLargeIcon } from "../../icons"
import { getDefaultPost, defaultUser } from "../../data"
import GridPost from '../shared/GridPost'
import { Link } from "react-router-dom"

function MorePostsFromUser() {
  const classes = useMorePostsFromUserStyles()

  let loading = false

  return (
    <div className={classes.container}>
      <Typography color="textSecondary" variant="subtitle1" component="h2" gutterBottom className={classes.typography} >
        More Posts from{" "}
        <Link to={`/${defaultUser.username}`} className={classes.link}>
          @{defaultUser.username}
        </Link>
      </Typography>
      <br />
      {loading ? (<LoadingLargeIcon />) : (
        <article className="classes.article">
          <div className={classes.postContainer}>
            {Array.from({ length: 9}, () => getDefaultPost()).map(post => (
              <GridPost key={post.id} post={post} />
            ))}
          </div>
        </article>
      )}
    </div>
  )
}

export default MorePostsFromUser
