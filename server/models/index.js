const { Sequelize } = require("sequelize");

const getUser = require("./user");
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
  sequelize.sync();
}

module.exports = main;
