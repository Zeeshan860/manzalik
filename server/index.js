const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
/////Apollo Server////////
const { ApolloServer } = require("apollo-server-express");

async function main() {
  const typeDefs = `
  
  type Query {
  totalUsers:Int!
  
  }`;
  const resolvers = {
    Query: {
      totalUsers: () => 5,
    },
  };
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  //////////////

  const app = express();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // // Index route
  app.get("/", (req, res) => res.send("INDEX"));

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, console.log(`Server started on port ${PORT}`));
  // apolloServer.listen(PORT,()=>console.log(` to access the server use use https://localhost: ${PORT}`));
}
main();
