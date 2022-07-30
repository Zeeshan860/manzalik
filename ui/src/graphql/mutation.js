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
  }
`;
