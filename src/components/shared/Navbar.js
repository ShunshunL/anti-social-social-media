import React from "react"
import { Link, useHistory } from 'react-router-dom'
import { useNavbarStyles, WhiteTooltip, RedTooltip } from "../../styles"
import { AppBar, Hidden, InputBase, Avatar, Fade, Grid, Typography, Zoom } from "@material-ui/core"
import { LoadingIcon, AddIcon, LikeIcon, LikeActiveIcon, ExploreIcon, ExploreActiveIcon, HomeActiveIcon, HomeIcon } from "../../icons"
import { defaultCurrentUser, getDefaultUser } from "../../data"
import NotificationTooltip from '../notification/NotificationTooltip'
import NotificationList from '../notification/NotificationList'
// Navbar progress loading
// import {useNProgress} from '@tanem/react-nprogress'

function Navbar({ minNav }) {
  const classes = useNavbarStyles()
  const history = useHistory()
  const path = history.location.pathname
  // const [isLoadingPage, setLoadingPage] = React.useState(true)

  // React.useEffect(() => {
  //   setTimeout(() => setLoadingPage(false), 10000)
  // }, [path])

  return ( 
    <>
    {/* <Progress isAnimating={isLoadingPage} /> */}
    <AppBar className={classes.appBar}>
      <section className={classes.section}>
        <Logo />
        {!minNav && <Search history={history} />}
        {!minNav && <Links path={path} />}
      </section>
    </AppBar>
    </>
  )
}

function Logo() {
  const classes = useNavbarStyles()

  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <div className={classes.logoWrapper}>
          <img src="https://fontmeme.com/permalink/200607/6b50f32a2790edff0cbdefd02aa12b9c.png" alt="Anti Social Social Media" className={classes.logo} />
        </div>
      </Link>
    </div>
  )
}

function Search({ history }) {
  const classes = useNavbarStyles()
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const hasResults = Boolean(query) && results.length > 0 

  React.useEffect(() => {
    if (!query.trim()) return
    setResults(Array.from({ length: 5 }, () => getDefaultUser()))
  }, [query])

  function handleClearInput() {
    setQuery('')
  }

  return (
    <Hidden smDown>
      <WhiteTooltip 
        arrow 
        interactive 
        TransitionComponent={Fade} 
        open={hasResults} 
        title={hasResults && (
          <Grid className={classes.resultContainer} container >
            {results.map(result => (
              <Grid key={result.id} item className={classes.resultLink}
                onClick={() => {history.push(`/${result.username}`); handleClearInput()}} >
                <div className={classes.resultWrapper}>
                  <div className={classes.avatarWrapper}>
                    <Avatar src={result.profile_image} alt="profile image" />
                  </div>
                  <div className={classes.nameWrapper}>
                    <Typography variant="body1">
                      {result.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {result.name}
                    </Typography>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
      >
        <InputBase className={classes.input} onChange={event => setQuery(event.target.value)} startAdornment={<span className={classes.searchIcon} />} endAdornment={loading ? <LoadingIcon /> : <span onClick={handleClearInput} className={classes.clearIcon} />} placeholder="Search" value={query} />
      </WhiteTooltip>
    </Hidden>
  )
}

function Links({ path }) {
  const classes = useNavbarStyles()
  const [showList, setList] = React.useState(false)
  const [showTooptip, setTooptip] = React.useState(true)

  React.useEffect(() => {
    const timeout = setTimeout(handleHideTooptip, 5000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  function handleToggleList() {
    setList(prev => !prev)
  }
  
  function handleHideTooptip() {
    setTooptip(false)
  }

  function handleHideLists() {
    setList(false)
  }
  
  return (
    <div className={classes.linksContainer}>
      {showList && <NotificationList handleHideLists={handleHideLists} />}
      <div className={classes.linksWrapper}>
        <Hidden xsDown>
          <AddIcon />
        </Hidden>
        <Link to="/">
          {path === "/" ? <HomeActiveIcon /> : <HomeIcon /> }
        </Link>
        <Link to="/explore">
          {path === "/explore" ? <ExploreActiveIcon /> : <ExploreIcon /> }
        </Link>
        <RedTooltip arrow open={showTooptip} onOpen={handleHideTooptip} TransitionComponent={Zoom} title={<NotificationTooltip />} >
          <div className={classes.notifications} onClick={handleToggleList}>
            {showList ? <LikeActiveIcon /> : <LikeIcon />}
          </div>
        </RedTooltip>
        <Link to={`/${defaultCurrentUser.username}`}>
          <div className={path === `/${defaultCurrentUser.username}` ? classes.profileActive : ""}>
          </div>
          <Avatar src={defaultCurrentUser.profile_image} className={classes.profileImage} />
        </Link>
      </div>
    </div>
  )
}

// function Progress({ isAnimating }) {
//   const classes = useNavbarStyles()

//   const {animationDuration, isFinished, progress} = useNProgress({ isAnimating })

//   return (
//     <div className={classes.progressContainer} style={{opacity: isFinished ? 0 : 1, transition: `opacity ${animationDuration}ms linear`}}>
//       <div className={classes.progressBar} style={{marginLeft: `${(-1 + progress) * 100}%`, transition: `margin-left ${animationDuration}ms linear`}}>
//         <div className={classes.progressBackground} />
//       </div>
//     </div>
//   )
// }

export default Navbar
