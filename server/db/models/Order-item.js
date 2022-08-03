const Sequelize = require('sequelize');
const db = require('../db');
const Mons = require('./Mons');

const OrderItem = db.define('order-item', {
  //price of each indv item at time of purchase
  price: {
    type: Sequelize.FLOAT,
  },
  //quantity of item in order
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  //price * qty = totalPrice
  totalPrice: {
    type: Sequelize.FLOAT,
  },
});

module.exports = OrderItem;
