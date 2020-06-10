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