const { Sequelize } = require("sequelize");

const getUser = require("./user");
const getHouse = require("./house");
function main() {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,

    {
      dialect: process.env.DIALECT,
      localhost: process.env.HOST,

      operatorsAliases: false,

      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }    
  );
  const db = { sequelize };
  sequelize
    .authenticate()
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error:" + err));
  db.User = getUser(sequelize);
  db.House = getHouse(sequelize);
  db.User.hasMany(db.House, { sourceKey: 'id', foreignKey: 'userId' });

  sequelize.sync({force: true});
  return db;
}

module.exports = main;