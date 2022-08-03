
'use strict';

const {
  db,
  models: { User, Order, Items, OrderItem },
} = require('../server/db');

"use strict";
const pokedex = require("./pokedata");
// import pokedex from "./pokedata";


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables

  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);
  console.log(`seeded ${users.length} users`);

  // Creating Orders
  const orders = await Promise.all([
    //creates two empty orders
    Order.create(),
    Order.create(),
  ]);

  console.log(`seeded ${orders.length} orders`);

  //testing thorugh table and associations
  const cody = users[0];
  const bulb = items[0];
  const ivy = items[1];
  const order1 = orders[0];
  // add one bulb to order1
  await bulb.addOrder(order1, {
    through: { qty: 1, price: bulb.price, totalPrice: bulb.price * 1 },
  });
  // add two ivy to order1
  await ivy.addOrder(order1, {
    through: { qty: 2, price: ivy.price, totalPrice: ivy.price * 2 },
  });
  // set owner of order1 to cody
  await order1.setUser(cody);

  // testing eager loading

  // attempting to console.log each mon in order1 (not working yet)
  const order1Contents = await OrderItem.findAll({
    where: {
      orderId: 1,
    },
  });

//create items

  await Promise.all(
    order1Contents.map(async item => {
      const prod = await Item.findByPk(item.itemId);
      console.log(prod);
      return prod;
    })
  );

  console.log(`seeded successfully`);
  return;


  await Promise.all(
    pokedex.map(async (item) => {
      return Items.create({
        name: item.name.english,
        price:
          Math.floor(Math.random() * (10 * 1000 - 1 * 100) + 1 * 100) / 100,
        description: item.description,
        imageUrl: item.image.hires,
      });
    })
  );
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');

  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/

if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
