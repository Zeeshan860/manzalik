const typeDefs = ` 
type User{
    id: ID!
    firstName:String!
    lastName: String!
    phoneNo: Int!
    email: String!  
}

type AuthPayload {
    token: String!
    user: User!
  }

type Query {
    totalUsers:Int!,
    me: User!
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
    
}



 `;
module.exports = typeDefs;
