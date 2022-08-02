//this is the access point for all things database related!

const db = require('./db');

const Mons = require("./models/Mons");
const User = require('./models/User');
const Cart = require('./models/Cart');

//associations could go here!

/* Nick is thinking:
   User.hasMany(Cart) */

module.exports = {
  db,
  Mons,
  models: {
    User,
    Mons,
    Cart,
  },
};
