//this is the access point for all things database related!

const db = require("./db");
const Items = require("./models/Items");
const User = require('./models/User');
const Cart = require('./models/Cart');

//associations could go here!

/* Nick is thinking:
   User.hasMany(Cart) */

module.exports = {
  db,
  models: {
    User,
    Items,
    Cart,
  },
};
