const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const resolvers = {
  Query: {
    totalUsers: async (parent, args, context, info) => {
      const db = context.db;

      const count = await db.User.count();
      return count;
    },
  
     // query for total house
    totalHouse: async (parent, args, context, info) => {
      const db = context.db;

      const count = await db.House.count();
      return count;
    },
    me: async (parent, args, context, info, ) => {
      const user = context.user;
      
      return  user;
    },
    getPersonalHouses:  async (parent, args, context, info ) => {
      const user = context.user;
      const db= context.db
      if (!user) {
        throw new Error("Unauthorized")
      }
      const houses= db.House.findAll(
        {
          where: {userId: user.id}
        }
      );
      return  houses;
    },
    getHouses:  async (parent, args, context, info ) => {
      const user = context.user;
      const db= context.db
      if (!user) {
        throw new Error("Unauthorized")
      }
      const houses= db.House.findAll({
        where: {reserved: false},
        include: [{
          model: db.User,
          as: 'user',
          fields: ['id','phoneNo']
        }]
      })
      
      return  houses;
    },
  },

  Mutation: {
    registerUser: async (parent, args, context, info) => {
      try {
        const db = context.db;
        const { firstName, lastName, phoneNo, email, password } = args;
        const user = await db.User.create({
          firstName,
          lastName,
          phoneNo,
          email,
          password: await bcrypt.hash(password, 10),
        });
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1y" }
        );
        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (parent, args, context, info) => {
      try {
        const db = context.db;
        const { email, password } = args;
        const user = await db.User.findOne({ where: { email } });
        if (!user) {
          throw new Error("No user with that email");
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Incorrect password");
        }
        // return jwt
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    resetPassword: async (parent, args, context, info) => {
      try {
        const user = context.user;
        const db= context.db
        if (!user) {
          throw new Error("Unauthorized")
        }
        const isValid = await bcrypt.compare(args.oldPassword, user.password);
        if (!isValid) {
          throw new Error("Incorrect password");
        }
        await db.User.update({
          password: await bcrypt.hash(args.newPassword, 10)
        },{
          where: {id: user.id}
        })
        return "success";
      } catch (error) {
        throw new Error(error.message);
      }
    },

    deleteHouse: async (parent, args, context, info) => {
      try {
        const user = context.user;
        const db= context.db
        if (!user) {
          throw new Error("Unauthorized")
        }
        await db.House.destroy({where: {id: args.id}})
        return "success";
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // enter new house
    saveHouse: async (parent, args, context, info) => {
      try {
        const user = context.user;
        if (!user) {
          throw new Error("Unauthorized")
        }
        const db = context.db;
        const {
          id,
          area,
          bedRooms,
          kitchens,
          washRooms,
          noOfStoreys,
          rentalPrice,
          location,
          description,
          province,
          city,
          furnished,
          reserved,
          image,
        } = args;


        const [house] = await db.House.upsert({
          id,
          area,
          bedRooms,
          kitchens,
          washRooms,
          noOfStoreys,
          rentalPrice,
          location,
          description,
          province,
          city,
          furnished,
          reserved,
          userId: user.id,
          image
        });
        
        return house;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
module.exports = resolvers;
