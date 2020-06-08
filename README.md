# Anti Social Social Media

This is an app that is inspired by Instagram but leaves the mental illness-inducing part out of it. This app lets you upload photographs but you cannot upload selfies or people in photos. This app does not have hidden advertisements. This app will bring you peace instead of anxiety from people's faces and lifestyles. When you can't upload selfies and faces, it'll greatly reduce people misusing the platform to advertise/profit/push their own agenda. There are people out there with social anxiety but they want to connect with people too. It's just harder for them. Instagram is a great platform to connect but it also brings anxiety/depression with it. It is filled with people who post over-edited selfies to gain likes and make money. I want to make an app that would bring the best parts of social media apps and leave out the part that is affecting people's mental health negatively. I just really miss the beginning of Instagram where most photos are posted in hope of sharing something beautiful. I hope this could bring people together positively and bring happiness into our lives. 

## Technologies used: 

* [React](https://reactjs.org/) - The JavaScript library used to build the frontend 
* [React Hooks](https://reactjs.org/docs/hooks-reference.html) - Technology used instead of redux for state management 
* [Apollo](https://www.apollographql.com/docs/react/) - Another state management library used for caching and updating UI(compatible with GraphQL)
* [GraphQL](https://graphql.org/) - A query language for API, used for predictable api results and easy querying(only one endpoint)
* [Hasura](https://hasura.io/) - The backend API builder, it uses GraphQL on PostgresSQL. It gives you a console to write schema on. It also makes it super easy to test out queries as you go. 

# Planning: 

## Routes 

### / (Feed Page)
  
Components: 

- FeedPost 
- FeedPostSkeleton 
- FeedSideSuggestions

### /explore (explore page)

Components: 
 
- ExploreSuggestions
- ExploreGrid

### /p/:postId (Single Post Page)

Components: 
 
- Post 
- PostSkeleton
- PostModal 
- MorePostsFromUser

### Notifications: 

Components: 

- NotificationList 
- NotificationToolTip

### /:username (Profile Page)

Components: 

- ProfileTabs

### /accounts/edit/ (Edit Profile Page)

### /accounts/login (Login Page)

### /accounts/emailsignup/

### Not Found Page

## Shared Components 

- Navbar 
- FollowSuggestions
- UserCard
- FollowButton
- LoadingScreen
- OptionsDialog
- ProfilePic
- Layout
- SEO 
