import { gql } from '@apollo/client';

export const TOTAL_USERS_QUERY = gql`
  query {
    totalUsers
  }
`;
export const CURRENT_USER_QUERY = gql`
  query {
    me {
    id
    firstName
    lastName
    phoneNo
    email
    }
  }
`;
