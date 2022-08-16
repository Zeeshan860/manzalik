const Sequelize = require("sequelize");

function main(db) {
  const House = db.define(
    "house",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bedRooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      washRooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      areaUnit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId:{
        type:Sequelize.UUID,
        allowNull: false,
      }
    },
    { tableName: "house" }
  );
  return House;
}

module.exports = main;