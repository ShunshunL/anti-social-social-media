import { gql } from 'apollo-boost'

export const CURRENT_USER = gql`
  subscription currentUser($userId: String) {
  users(where: {user_id: {_eq: $userId}}) {
    name
    id
    user_id
    username
    profile_image
    last_checked
    notifications(order_by: { created_at: desc }) {
      id 
      type 
      created_at 
      post {
        id 
        image 
      }
      user {
        id 
        username
        profile_image
      }
    }
  }
}

`

export const GET_POST = gql`
  subscription getPost($postId: uuid!) {
  posts_by_pk(id: $postId) {
    id
    caption
    created_at
    image
    location
    user {
      id
      name
      profile_image
      username
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
    comments(order_by: {created_at: desc}) {
      created_at
      content
      id
      user {
        username
        profile_image
      }
    }
  }
}

`