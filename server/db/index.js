//this is the access point for all things database related!

const db = require("./db");
const Items = require("./models/Items");

const User = require("./models/User");

//associations could go here!

module.exports = {
  db,
  Items,
  models: {
    User,
    Items,
  },
};
