import React from "react";
import { useFeedPageStyles } from "../styles";
import Layout from '../components/shared/Layout'
import UserCard from '../components/shared/UserCard'
import FeedSideSuggestions from '../components/feed/FeedSideSuggestions'
// import FeedPost from '../components/feed/FeedPost'
// import { getDefaultPost } from '../data'
import { Hidden } from "@material-ui/core";
import LoadingScreen from "../components/shared/LoadingScreen";
import { LoadingLargeIcon } from "../icons";
import FeedPostSkeleton from "../components/feed/FeedPostSkeleton";
import { UserContext } from "../App";
import { useQuery } from "@apollo/react-hooks";
import { GET_FEEDS } from "../graphql/queries";
import usePageBottom from "../utils/usePageBottom";
// lazy loading => performance boost (need to be at the bottom)
const FeedPost = React.lazy(() => import('../components/feed/FeedPost'))

function FeedPage() {
  const classes = useFeedPageStyles();
  const [isEndOfFeed, setEndOfFeed] = React.useState(false)
  const {currentUser, feedIds} = React.useContext(UserContext)
  const variables = { feedIds, limit: 2 }
  const { data, loading, fetchMore } = useQuery(GET_FEEDS, { variables })
  const isPageBottom = usePageBottom()

  function handleUpdateQuery(prev, { fetchMoreResult }) {
    if (fetchMoreResult.posts.length === 0) {
      setEndOfFeed(true)
      return prev 
    }
    return { posts: [...prev.posts, ...fetchMoreResult.posts]}
  }

  React.useEffect(() => {
    if (!isPageBottom || !data) return 
    const lastTimestamp = data.posts[data.posts.length - 1].created_at
    const newVariables = { ...variables, lastTimestamp }
    fetchMore({
      variables: newVariables,
      updateQuery: handleUpdateQuery
    })
  }, [isPageBottom, data, fetchMore, variables])

  // let loading = false
  if (loading) return <LoadingScreen />

  return <Layout>
    <div className={classes.container}>
      {/* feed post  */}
      <div>
        {data.posts.map((post, index) => (
          <React.Suspense key={post.id} fallback={<FeedPostSkeleton />}>
            <FeedPost index={index} post={post} />
          </React.Suspense>
        ))}
      </div>
      {/* side bar */}
      <Hidden smDown>
        <div className={classes.sidebarContainer}>
          <div className={classes.sidebarWrapper}>
            <UserCard user={currentUser} avatarSize={50} />
            <FeedSideSuggestions />
          </div>
        </div>
      </Hidden>
      {!isEndOfFeed && <LoadingLargeIcon />}
    </div>
  </Layout>;
}

export default FeedPage;
