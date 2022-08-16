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

export const NEW_HOUSE_MUTATION = gql`
  mutation newHouseMutation(
    $area:String!,
    $bedRooms: Int!,
    $kitchens: Int!,
    $washRooms: Int!,
    $noOfStoreys:String!,
    $rentalPrice:Int!,
    $location:String!,
    $description:String!,
    $province:String!,
    $city:String!,
    $furnished:Boolean!
  ) {
    newHouse(area: $area, bedRooms:$bedRooms, kitchens: $kitchens, washRooms:$washRooms,
      noOfStoreys:$noOfStoreys, rentalPrice:$rentalPrice, location:$location,  description:$description,
      province:$province,  city: $city, furnished:$furnished ) {
      token
    }
    }`;
