import React from "react"
import { usePostStyles } from "../../styles"
import UserCard from "../shared/UserCard"
import { MoreIcon, CommentIcon, ShareIcon, UnlikeIcon, LikeIcon, RemoveIcon, SaveIcon } from '../../icons'
import { Link } from "react-router-dom"
import { Typography, Button, Hidden, Divider, TextField, Avatar } from "@material-ui/core"
// collapse comments 
import OptionsDialog from '../shared/OptionsDialog'
// import { defaultPost } from '../../data'
import PostSkeleton from "./PostSkeleton"
import { useSubscription, useMutation } from "@apollo/react-hooks"
import { GET_POST } from "../../graphql/subscriptions"
import { UserContext } from "../../App"
import { LIKE_POST, DELETE_LIKE, SAVE_POST, DELETE_SAVED_POST, CREATE_COMMENT } from "../../graphql/mutation"

function Post({ postId }) {
  const classes = usePostStyles()
  const [showOptionsDialog, setOptionsDialog] = React.useState(false)
  // const [isLoading, setLoading] = React.useState(true)
  const variables = {postId}
  const { data, loading } = useSubscription(GET_POST, {variables})
  
  // setTimeout(() => setLoading(false), 2000)
  if (loading) return <PostSkeleton />
  const { saved_posts, user_id, image, id, likes, user, caption, comments, created_at, location, likes_aggregate } = data.posts_by_pk
  const likesCount = likes_aggregate.aggregate.count
  
  return (
    <div className={classes.postContainer}>
      <article className={classes.article}>
        {/*  Post Header */}
        <div className={classes.postHeader}>
          <UserCard location={location} user={user} avatarSize={32} />
          <MoreIcon className={classes.moreIcon} onClick={() => setOptionsDialog(true)} />
        </div>
        {/*  Post Image */}
        <div className={classes.postImage}>
          <img src={image} alt="Post" className={classes.image} />  
        </div>
        {/*  Post Buttons */}
        <div className={classes.postButtonsWrapper}>
          <div className={classes.postButtons}>
            <LikeButton likes={likes} postId={id} authorId={user.id} />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton savedPosts={saved_posts} postId={id} />
          </div>
          <Typography className={classes.likes} variant="subtitle2">
            <span>{likesCount === 1 ? '1 like' : `${likesCount} likes`}</span>
          </Typography>
          <div style={{ overflowY: 'scroll', padding: '16px 12px', height: '100%' }}>
            <Caption user={user} createdAt={created_at} caption={caption} />
            {comments.map(comment => (
              <UserComment key={comment.id} comment={comment} />
            ))}
          </div>
          <Typography color="textSecondary" className={classes.datePosted}>
            5 DAYS AGO
          </Typography>
          <Hidden xsDown>
            <div className={classes.comment}>
              <Divider />
              <Comment postId={id} />
            </div>
          </Hidden>
        </div>
      </article>
      {showOptionsDialog && <OptionsDialog onClose={() => setOptionsDialog(false)} />}
    </div>
  )
}

function Caption({ user, caption, createdAt}) {
  const classes = usePostStyles()

  return (
    <div style={{ display: 'flex'}}>
      <Avatar src={user.profile_image} alt="user avatar" style={{ marginRight: 14, width: 32, height: 32 }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link to={user.username}>
          <Typography variant="subtitle2" component="span" className={classes.username}>
            {user.username}
          </Typography>
          <Typography variant="body2" component="span" className={classes.postCaption} style={{ paddingLeft: 0 }} dangerouslySetInnerHTML={{ __html: caption }} />
        </Link>
        <Typography style={{ marginTop: 16, marginBottom: 4, display: 'inline-block' }} color="textSecondary" variant="caption">
          {createdAt}
        </Typography>
      </div>
    </div>
  )
}

function UserComment({ comment }) {
  const classes = usePostStyles()

  return (
    <div style={{ display: 'flex'}}>
      <Avatar src={comment.user.profile_image} alt="user avatar" style={{ marginRight: 14, width: 32, height: 32 }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link to={comment.user.username}>
          <Typography variant="subtitle2" component="span" className={classes.username}>
            {comment.user.username}
          </Typography>
          <Typography variant="body2" component="span" className={classes.postCaption} style={{ paddingLeft: 0 }}>
            {comment.content}
          </Typography>
        </Link>
        <Typography style={{ marginTop: 16, marginBottom: 4, display: 'inline-block' }} color="textSecondary" variant="caption">
          {comment.created_at}
        </Typography>
      </div>
    </div>
  )
}

function LikeButton({ likes, authorId, postId }) {
  const classes = usePostStyles()
  const { currentUserId } = React.useContext(UserContext)
  const isAlreadyLiked = likes.some(({ user_id }) => user_id === currentUserId)
  const [liked, setLiked] = React.useState(isAlreadyLiked)
  const Icon = liked ? UnlikeIcon : LikeIcon
  const className = liked ? classes.liked : classes.like
  const onClick = liked ? handleUnlike : handleLike
  const [likePost] = useMutation(LIKE_POST)
  const [deleteLike] = useMutation(DELETE_LIKE)
  const variables = {
    postId,
    userId: currentUserId,
    // profileId: authorId 
  }


  function handleUnlike() {
    // console.log('like')
    setLiked(false)
    deleteLike({variables})
  }

  function handleLike() {
    // console.log('unlike')
    setLiked(true)
    likePost({variables})
  }
  
  return <Icon className={className} onClick={onClick} />
}

function SaveButton({ postId, savedPosts }) {
  const classes = usePostStyles()
  const { currentUserId } = React.useContext(UserContext)
  const isSaved = savedPosts.some(({user_id}) => user_id === currentUserId)
  const [saved, setSaved] = React.useState(isSaved)
  const Icon = saved ? RemoveIcon : SaveIcon
  const onClick = saved ? handleRemove : handleSave
  const [savePost] = useMutation(SAVE_POST)
  const [deleteSavedPost] = useMutation(DELETE_SAVED_POST)
  const variables = {
    postId,
    userId: currentUserId
  }

  function handleRemove() {
    // console.log('save')
    setSaved(false)
    deleteSavedPost({ variables })
  }

  function handleSave() {
    // console.log('remove')
    setSaved(true)
    savePost({ variables })
  }
  
  return <Icon className={classes.saveIcon} onClick={onClick} />
}

function Comment({ postId }) {
  const classes = usePostStyles()
  const [content, setContent] = React.useState('')
  const [createComment] = useMutation(CREATE_COMMENT)
  const { currentUserId } = React.useContext(UserContext)

  function handleAddComment() {
    const variables = {
      content,
      postId,
      userId: currentUserId
    }
    createComment({ variables })
  }

  return (
    <div className={classes.commentContainer}>
      <TextField 
        fullWidth 
        value={content} 
        placeholder="Add a comment..." 
        multiline 
        rowsMax={2} 
        rows={1} 
        onChange={event => setContent(event.target.value)} 
        className={classes.textField}
        InputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline
          }
        }} />
        <Button onClick={handleAddComment} color="primary" className={classes.commentButton} disabled={!content.trim()}>
          Post
        </Button>
    </div>
  )
}

export default Post
