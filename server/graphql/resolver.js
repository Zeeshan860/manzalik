

const resolvers = {
    Query: {
      totalUsers: async (parent,args,context,info) => {
        const db=context.db; 
     
        const count=await db.User.count()
        return count;

      },
    },
  };
  module.exports=resolvers;