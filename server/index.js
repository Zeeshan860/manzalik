require("dotenv/config");

const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const resolvers = require("./graphql/resolver");
const typeDefs = require("./graphql/typedefs");
const getDb = require("./models");
const { ApolloServer } = require("apollo-server-express");
const { json } = require("body-parser");
const jwt = require("jsonwebtoken");

async function main() {
  const db = getDb();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async({ req, res }) => {
      const token = req.headers.authorization;
      let user = null;
      if (token) {
        try{
          const decoded = jwt.verify(token.split(" ") [1], process.env.JWT_SECRET); 
         user =await db.User.findOne({where:{id:decoded.id}});
        } catch(error) {
          console.log(error)
        }
       

      }
     
     
      
    
      // if (!user) throw new AuthenticationError("No User with that Email");
      return { req, res, db ,user};
    },
  });

  const app = express();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // // Index route
  app.get("/", (req, res) => res.send("INDEX"));

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, console.log(`Server started on port ${PORT}`));
}
main();
