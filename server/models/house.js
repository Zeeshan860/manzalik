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
      area: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bedRooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kitchens: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      washRooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      noOfStoreys: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rentalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      province: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      furnished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      image: {
        type: Sequelize.TEXT,
      }
    },
    { tableName: "house" }
  );
  return House;
}

module.exports = main;