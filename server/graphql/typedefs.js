const typeDefs = ` 
type User{
    id: ID!
    firstName:String!
    lastName: String!
    phoneNo: Int!
    email: String!  
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
}

type AuthPayload {
    token: String!
    user: User!
  }

type Query {
        totalUsers:Int!
        totalHouse:Int!
}

type Mutation {
    registerUser (   firstName:String!,
        lastName: String!,
        phoneNo: String!,
        email: String! ,
        password: String!):AuthPayload!
    
    login(
        email:String!,
        password: String!):AuthPayload!


       newHouse ( 
        area:String!,
        bedRooms: Int!,
        kitchens: Int!,
        washRooms: Int!,
        noOfStoreys:String!,
        rentalPrice:Int!,
        location:String!,
        description:String!,
        province:String!,
        city:String!,
        furnished:Boolean!):House
    
}

 `;
module.exports = typeDefs;
