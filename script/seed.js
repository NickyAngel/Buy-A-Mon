'use strict';

const {
  db,
  models: { User, Order, Mons, OrderItem },
} = require('../server/db');

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

  // Create Mons

  const mons = await Promise.all([
    Mons.create({
      name: 'Bulbasaur',
      price: 3.99,
      Description: 'low level grass pokemon',
    }),
    Mons.create({
      name: 'Ivysaur',
      price: 4.99,
      Description: 'Mid level grass pokemon',
    }),
    Mons.create({
      name: 'Venasaur',
      price: 6.99,
      Description: 'high level grass pokemon',
    }),
  ]);

  // Creating Orders
  const orders = await Promise.all([
    //creates two empty orders
    Order.create(),
    Order.create(),
  ]);

  console.log(`seeded ${orders.length} orders`);

  //testing thorugh table and associations
  const cody = users[0];
  const bulb = mons[0];
  const ivy = mons[1];
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
  const order1Contents = await OrderItem.findAll({
    where: {
      orderId: 1,
    },
  });
  // attempting to console.log each mon in order1 (not working yet)
  order1Contents.map(async mon => {
    const item = await Mons.findByPk(mon.monId);
    console.log(item);
  });

  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    mons: {
      Bulbasaur: mons[0],
      Ivysaur: mons[1],
      Venasaur: mons[2],
    },
  };
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
