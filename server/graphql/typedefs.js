const typeDefs = ` 
type User{
    id: ID!
    firstName:String!
    lastName: String!
    phoneNo: String!
    email: String!  
}

type HouseAgregate{
    total: Int
    reserved: Int
    nonReserved: Int
}

type House{
    id: ID!
    area:String!
    bedRooms: Int!
    kitchens: Int!
    washRooms: Int!
    noOfStoreys:String!
    rentalPrice:Int!
    location:String!
    description:String!
    province:String!
    city:String!
    furnished:Boolean!
    reserved: Boolean
    image:String
    createdAt: String
    user: User
}

type AuthPayload {
    token: String!
    user: User!
  }

type Query {
    totalUsers:Int!
    totalHouse:Int!
    getHousesAgregate: HouseAgregate
    me: User!
    getPersonalHouses:[House]!
    getHouses:[House]!
   
}

type Mutation {
    deleteHouse(id: ID!): String
    registerUser (firstName:String!,
        lastName: String!,
        phoneNo: String!,
        email: String! ,
        password: String!): AuthPayload!
    
    login(
        email:String!,
        password: String!): AuthPayload!

    resetPassword(
        oldPassword: String!,
        newPassword: String!): String!


    saveHouse ( 
        id: ID,
        area: String!,
        bedRooms: Int!,
        kitchens: Int!,
        washRooms: Int!,
        noOfStoreys:String!,
        rentalPrice:Int!,
        location:String!,
        description:String!,
        province:String!,
        city:String!,
        furnished:Boolean!,
        reserved:Boolean!,
        image:String
        ):House
    
}

 `;
module.exports = typeDefs;
