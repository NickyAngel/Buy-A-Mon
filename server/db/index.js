//this is the access point for all things database related!

const db = require('./db');

const Mons = require('./models/Mons');
const User = require('./models/User');
const Order = require('./models/Order');
const OrderItem = require('./models/Order-item');

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Mons, { through: OrderItem });
Mons.belongsToMany(Order, { through: OrderItem });

module.exports = {
  db,
  Mons,
  models: {
    User,
    Mons,
    Order,
    OrderItem
  },
};
