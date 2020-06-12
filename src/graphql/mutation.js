import { gql } from 'apollo-boost'

export const CREATE_USER = gql `
  mutation createUser($userId: String!, $name: String!, $username: String!, $email: String!, $bio: String!, $website: String!, $profileImage: String!, $phoneNumber: String!) {
    insert_users(objects: {bio: $bio, email: $email, name: $name, phone_number: $phoneNumber, profile_image: $profileImage, user_id: $userId, username: $username, website: $website}){
      affected_rows
  }
}
`

export const EDIT_USER_AVATAR = gql`
  mutation editUserAvatar($id: uuid!, $profileImage: String!) {
    update_users(
      where: { id: { _eq: $id } }
      _set: { profile_image: $profileImage }
    ) {
      affected_rows
    }
  }
`

export const EDIT_USER = gql`
  mutation editUser($id: uuid!, $name: String!, $username: String!, $bio: String!, $email: String!, $phoneNumber: String!, $website: String! ) {
  update_users(where: {id: {_eq: $id}}, _set: {bio: $bio, email: $email, name: $name, phone_number: $phoneNumber, username: $username, website: $website}) {
    affected_rows
  }
}

`

export const CREATE_POST = gql`
  mutation createPost($userId: uuid!, $location: String!, $image: String!, $caption: String!) {
  insert_posts(objects: {user_id: $userId, location: $location, image: $image, caption: $caption}) {
    affected_rows
  }
}

`

export const LIKE_POST = gql`
  mutation likePost($postId: uuid!, $userId: uuid!) {
  insert_likes(objects: {post_id: $postId, user_id: $userId }) {
    affected_rows
  }
}
`

export const DELETE_LIKE = gql`
  mutation deleteLike($postId: uuid!, $userId: uuid!) {
  delete_likes(where: {post_id: {_eq: $postId}, user_id: {_eq: $userId }}) {
    affected_rows
  }
}
`

export const SAVE_POST = gql`
  mutation savePost($postId: uuid!, $userId: uuid!) {
  insert_saved_posts(objects: {post_id: $postId, user_id: $userId }) {
    affected_rows
  }
}
`

export const DELETE_SAVED_POST = gql`
  mutation deleteSavedPost($postId: uuid!, $userId: uuid!) {
  delete_saved_posts(where: {post_id: {_eq: $postId}, user_id: {_eq: $userId }}) {
    affected_rows
  }
}
`

export const CREATE_COMMENT = gql`
  mutation createComment($postId: uuid!, $userId: uuid!, $content: String!) {
  insert_comments(objects: {post_id: $postId , user_id: $userId, content: $content }) {
    affected_rows
  }
}

`