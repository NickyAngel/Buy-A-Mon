const router = require('express').Router();
const {
  models: { User, Order, OrderItem, Item },
} = require('../db');
module.exports = router;
const jwt = require('jsonwebtoken');

const requireToken = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
const adminCheck = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).send('YOU SHALL NOT PASS');
  }
};
//getting all users by ID? not sure where we would do this
//GET api/users/
router.get('/', requireToken, adminCheck, async (req, res, next) => {
  try {
    const users = await User.findAll({
      //   // explicitly select only the id and email fields - even though
      //   // users' passwords are encrypted, it won't help if we just
      //   // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName', 'role'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//Grabbing a users data/profile when logged in
//GET api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//Create a new user row to the User table
//POST api/users/
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

//Update the user once the form is updated
//PUT api/users/:id
/* no update user functionality yet */
// router.put('/:id', async (req, res, next) => {
//   try {
//     const cart = await Order.findOne({
//       where: { userId: req.params.id, open: true },
//     });
//     cart.update({ ...cart, open: false });
//     res.json([]);
//   } catch (err) {
//     next(err);
//   }
// });
//Update the user once the form is updated
//PUT api/users/:id
// router.put('/:id', async (req, res, next) => {
//   try {
//     //decide what the req body looks like
//     const user = await User.findByPk(req.params.id);
//     //what are we able to change per user
//     res.send(await user.update({ ...req.body }));
//   } catch (err) {
//     next(err);
//   }
// });

//Delete the user if the user wants the account to be deleted
//DELETE api/users/:id
/* no deleting users functionality yet */
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     await user.destroy(req.params.id);
//     res.send(user);
//   } catch (err) {
//     next(err);
//   }
// });

/////////////////////////////////////////////// CART ROUTES ///////////////////////////////////////

//grab the cart per single user
//GET api/users/:id/cart/
router.get('/:id/cart/', requireToken, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: { userId: req.params.id, open: true },
    });
    const items = await OrderItem.findAll({
      where: { orderId: cart.id },
    });
    const itemDetails = [];
    await Promise.all(
      items.map(async item => {
        let eachMon = await Item.findByPk(item.itemId);
        eachMon.dataValues.priceAtSaleTime = item.price;
        eachMon.dataValues.qty = item.qty;
        eachMon.dataValues.totalPriceAtSaleTime = item.totalPrice;
        itemDetails.push(eachMon);
      })
    );
    res.json(itemDetails);
    // }
  } catch (err) {
    next(err);
  }
});

//Update the cart per item added to each cart
//PUT api/users/:id/cart/
router.put('/:id/cart/', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: { userId: req.params.id, open: true },
    });
    const item = await OrderItem.findOne({
      where: { itemId: req.body.id, orderId: cart.id },
    });

    if (req.body.add) {
      await item.update({
        ...item,
        qty: req.body.qty,
        totalPrice: item.price * (item.qty + 1),
      });
    } else {
      await item.update({
        ...item,
        qty: req.body.qty,
        totalPrice: item.price * (item.qty - 1),
      });
    }

    const items = await OrderItem.findAll({
      where: { orderId: cart.id },
    });
    const itemDetails = [];
    await Promise.all(
      items.map(async item => {
        let eachMon = await Item.findByPk(item.itemId);
        eachMon.dataValues.priceAtSaleTime = item.price;
        eachMon.dataValues.qty = item.qty;
        eachMon.dataValues.totalPriceAtSaleTime = item.totalPrice;
        itemDetails.push(eachMon);
      })
    );
    res.json(itemDetails);
    // }
  } catch (err) {
    next(err);
  }
});

// Are we trying to destroy carts per user? or maybe we can empty a cart at checkout
//PUT api/users/:id/cart/ EMPTY CART AT CHECKOUT
router.put('/:id/cart/', async (req, res, next) => {
  try {
    console.log(req.params);
    const cart = await Order.findOne({
      where: { userId: req.params.id, open: true },
    });
    await OrderItem.destroy({
      where: { itemId: req.params.itemId, orderId: cart.id },
    });
    const items = await OrderItem.findAll({
      where: { orderId: cart.id },
    });
    const itemDetails = [];
    await Promise.all(
      items.map(async item => {
        let eachMon = await Item.findByPk(item.itemId);
        eachMon.dataValues.priceAtSaleTime = item.price;
        eachMon.dataValues.qty = item.qty;
        eachMon.dataValues.totalPriceAtSaleTime = item.totalPrice;
        itemDetails.push(eachMon);
      })
    );
    res.json(itemDetails);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/cart', async (req, res, next) => {
  try {
    let cart = await Order.findOne({
      where: { userId: req.params.id, open: true },
    });
    if (!cart) {
      cart = await Order.create();
    }

    const itemOrder = await OrderItem.findOne({
      where: { itemId: req.body.id, orderId: cart.id },
    });

    let itemToAdd = await Item.findByPk(req.body.id);

    if (itemOrder) {
      let newQty = 0;
      newQty = itemOrder.qty + req.body.qty;
      await itemOrder.update({
        qty: newQty,
        totalPrice: itemOrder.price * newQty,
      });
    } else {
      let user = await User.findByPk(req.params.id);
      itemToAdd.addOrder(cart, {
        through: {
          qty: 1,
          price: itemToAdd.price,
          totalPrice: itemToAdd.price,
        },
      });

      cart.setUser(user);
    }
    res.json(itemToAdd);
  } catch (e) {
    next(e);
  }
});
//DELETE ROUTE FOR CART ITEM
router.delete('/:id/cart/:itemId', async (req, res, next) => {
  try {
    console.log(req.params);
    const cart = await Order.findOne({
      where: { userId: req.params.id, open: true },
    });
    await OrderItem.destroy({
      where: { itemId: req.params.itemId },
    });
    const items = await OrderItem.findAll({
      where: { orderId: cart.id },
    });
    const itemDetails = [];
    await Promise.all(
      items.map(async item => {
        let eachMon = await Item.findByPk(item.itemId);
        eachMon.dataValues.priceAtSaleTime = item.price;
        eachMon.dataValues.qty = item.qty;
        eachMon.dataValues.totalPriceAtSaleTime = item.totalPrice;
        itemDetails.push(eachMon);
      })
    );
    res.json(itemDetails);
  } catch (err) {
    next(err);
  }
});
//Are we going to even allow for item creation to be a feature sincei it can be implicitly bound to each user
// //POST api/users/:id/cart/
// router.post('/:id/cart/', async (req, res, next) => {
//   try {
//     //decide what the req body looks like
//     const cart = await Cart.create(req.body)
//     res.status(201).json(cart)
//   } catch (err) {
//     next(err)
//   }
// })

//Do we need DELETE cart route?
