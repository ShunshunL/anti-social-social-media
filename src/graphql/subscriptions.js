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
  }
}

`