import { gql } from '@apollo/client';

export const TOTAL_USERS_QUERY = gql`
  query {
    totalUsers
  }
`;

export const TOTAL_HOUSE_QUERY = gql`
  query {
    totalHouse
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
export const PERSONAL_HOUSES_QUERY = gql`
  query {
    getPersonalHouses {
      id
    area
    bedRooms
    kitchens
    washRooms
    noOfStoreys
    rentalPrice
    location
    description
    province
    city
    furnished
    image
      
    }
  }
`;
export const HOUSES_QUERY = gql`
  query {
    getHouses {
      id
    area
    bedRooms
    kitchens
    washRooms
    noOfStoreys
    rentalPrice
    location
    description
    province
    city
    furnished
    image
      
    }
  }
`;

