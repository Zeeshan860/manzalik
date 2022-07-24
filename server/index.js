const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const getDb = require("./models");

const { ApolloServer } = require("apollo-server-express");

async function main() {
  const typeDefs = `
  
  type Query {
  totalUsers:Int!
  
  }`;
  const resolvers = {
    Query: {
      totalUsers: async () => 5,
    },
  };
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const db = getDb();

  const app = express();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // // Index route
  app.get("/", (req, res) => res.send("INDEX"));

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, console.log(`Server started on port ${PORT}`));
}
main();
