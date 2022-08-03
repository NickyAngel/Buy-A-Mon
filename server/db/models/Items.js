const Sequelize = require("sequelize");
const db = require("../db");

const Items = db.define("items", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.0,
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://ecdn.teacherspayteachers.com/thumbitem/Pokemon-Theme-Amazing-Work-Coming-Soon-Signs-7112257-1628095729/original-7112257-1.jpg",
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "coming soon",
  },
});

module.exports = Items;
