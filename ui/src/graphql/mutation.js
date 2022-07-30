import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`
  mutation registerUserMutation(
    $firstName: String!
    $lastName: String!
    $phoneNo: String!
    $email: String!
    $password: String!
  ) {
    registerUser(firstName: $firstName, lastName: $lastName, phoneNo: $phoneNo, email: $email, password: $password) {
      token
    }
    }`;

export const LOGIN_USER_MUTATION = gql`
  mutation loginUserMutation(
    $email: String!
    $password: String!
  )
  {
    login(email: $email, password: $password) {
      token
    }
  }
`;
