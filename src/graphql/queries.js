import { gql } from 'apollo-boost'

export const CHECK_USERNAME = gql`
  query checkUsername($username: String!) {
  users(where: {username: {_eq: $username}}) {
    username
  }
}

`

export const GET_USER_EMAIL = gql`
  query getEmail($input: String!) {
  users(where: {
    _or: [{username: {_eq: $input}}, {phone_number: {_eq: $input}}]})
    {
    email
  }
}

`

export const GET_EDIT_USER = gql`
query getEditUser($id: uuid!) {
  users_by_pk(id: $id) {
    bio
    email
    name
    phone_number
    profile_image
    website
    username
    id
  }
}

`

export const FIND_USER = gql`
  query findUser($query: String) {
  users(where: {
    _or: [{ username: { _ilike: $query}}, { name: { _ilike: $query}}]
  }) {
    id 
    username
    name
    profile_image
  }
}

`

export const GET_USER_PROFILE = gql`
query getUserProfile($username: String!) {
  users(where: {username: {_eq: $username}}) {
    bio
    id
    name
    username
    website
    profile_image
    posts_aggregate {
      aggregate {
        count
      }
    }
    followers_aggregate {
      aggregate {
        count
      }
    }
    following_aggregate {
      aggregate {
        count
      }
    }
    saved_posts(order_by: { created_at: desc }) {
      post {
        image
        id
        likes_aggregate {
          aggregate {
            count
          }
        }
        comments_aggregate {
          aggregate {
            count
          }
        }
      }
    }
    posts(order_by: { created_at: desc }) {
      image
      id
      likes_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
}

`

// suggest followers to follow back, and also users created around the same time
export const SUGGEST_USERS = gql`
query suggestUsers($limit: Int!, $followerIds: [uuid!]!, $createdAt: timestamptz!) {
  users(limit: $limit, where: {_or: [
    { id: { _in: $followerIds }}, { created_at: { _gt: $createdAt}}
  ]}) {
		id 
    username 
    name
    profile_image
  }
}

`

// most popular posts, newest to oldest, excluding ones that we already follow
export const EXPLORE_POSTS = gql`
query explorePost($feedIds: [uuid!]!) {
  posts(order_by: {created_at: desc, likes_aggregate: {count: desc}, comments_aggregate: {count: desc}}, where: {user_id: {_nin: $feedIds}}) {
    id
    image
    likes_aggregate {
      aggregate {
        count
      }
    }
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
}
`

export const GET_MORE_POSTS_FROM_USER = gql`
query getMorePostsFromUser($userId: uuid!, $postId: uuid!) {
  posts(limit: 6, where: {user_id: {_eq: $userId}, _not: {id: {_eq: $postId}}}) {
    id
    image
    likes_aggregate {
      aggregate {
        count
      }
    }
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
}

`

export const GET_POST = gql`
  query getPost($postId: uuid!) {
  posts_by_pk(id: $postId) {
    id
    user {
      id
      username
    }
  }
}

`

export const GET_FEEDS = gql`
query getFeeds($limit: Int!, $feedIds: [uuid!]!, $lastTimestamp: timestamptz) {
  posts(limit: $limit, where: {user_id: {_in: $feedIds}, created_at: {_lt: $lastTimestamp}}, order_by: {created_at: desc}) {
    id
    caption
    created_at
    image
    location
    user {
      id
      name
      username
      profile_image
    }
    likes_aggregate {
      aggregate {
        count
      }
    }
    likes {
      id
      user_id
    }
    saved_posts {
      id
      user_id
    }
    comments_aggregate {
      aggregate {
        count
      }
    }
    comments(order_by: {created_at: desc}, limit: 2) {
      id
      content
      created_at
      user {
        username
      }
    }
  }
}


`