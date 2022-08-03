//this is the access point for all things database related!


const db = require("./db");
const Items = require("./models/Items");
const User = require('./models/User');
const Order = require('./models/Order');
const OrderItem = require('./models/Order-item');

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

//Super Many:Many relationship (from sequelize documentation)
Order.belongsToMany(Item, { through: OrderItem });
Item.belongsToMany(Order, { through: OrderItem });
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
Item.hasMany(OrderItem);
OrderItem.belongsTo(Item);

module.exports = {
  db,
  Items,
  models: {
    User,
    Items,
    Order,
    OrderItem,
  },
};
