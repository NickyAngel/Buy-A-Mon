//this is the access point for all things database related!

const db = require("./db");
const Mons = require("./models/Mons");

const User = require("./models/User");

//associations could go here!

module.exports = {
  db,
  Mons,
  models: {
    User,
    Mons,
  },
};
