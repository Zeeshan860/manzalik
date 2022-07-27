const bcrypt = require('bcryptjs')
const jwt =  require('jsonwebtoken')
const resolvers = {

    Query: {
      totalUsers: async (parent,args,context,info) => {
        const db=context.db; 
     
        const count=await db.User.count()
        return count;

      },
    },
  Mutation: {
     registerUser:async (parent,args,context,info) =>{
      try {
        const db=context.db; 
        const {firstName,lastName,phoneNo,email,password}=args;
        const user = await db.User.create({
          firstName,
          lastName,
          phoneNo,
          email,
          password: await bcrypt.hash(password, 10)
        })
        const token = jwt.sign(
          { id: user.id, email: user.email},
          process.env.JWT_SECRET,
          { expiresIn: '1y' }
        )
        return {
          token,
          user
        }
       } 
       catch (error) {
        throw new Error(error.message)
      }
    }
}}
module.exports=resolvers;