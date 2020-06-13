import React from "react"
import { useGridPostStyles } from "../../styles"
import { Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom"

function GridPost({ post }) {
  const classes = useGridPostStyles()
  const history = useHistory()

  // pushed modal to history so that app can display acccordingly 

  function handleOpenPostModal() {
    history.push({
      pathname: `/p/${post.id}`,
      state: { modal: true }
    })
  }


  const commentsCount = post.comments_aggregate.aggregate.count
  const likesCount = post.likes_aggregate.aggregate.count

  return (
    <div onClick={handleOpenPostModal} className={classes.gridPostContainer}>
      <div className={classes.gridPostOverlay}>
        <div className={classes.gridPostInfo}>
          <span className={classes.likes} />
          <Typography>
            {likesCount}
          </Typography>
        </div>
        <div className={classes.gridPostInfo}>
          <span className={classes.comments} />
          <Typography>
            {commentsCount}
          </Typography>
        </div>
      </div>
      <img src={post.image} alt="Post" className={classes.image} />
    </div>
  )
}

export default GridPost
