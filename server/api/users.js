const router = require('express').Router();
const {
  models: { User, Cart, Item },
} = require('../db');
module.exports = router;

//getting all users by ID? not sure where we would do this
//GET api/users/
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
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
    //decide what the req body looks like
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

//Update the user once the form is updated
//PUT api/users/:id
router.put('/:id', async (req, res, next) => {
  try {
    //decide what the req body looks like
    const user = await User.findByPk(req.params.id);
    //what are we able to change per user
    res.send(await user.update({ ...req.body }));
  } catch (err) {
    next(err);
  }
});

//Delete the user if the user wants the account to be deleted
//DELETE api/users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

/////////////////////////////////////////////// CART ROUTES ///////////////////////////////////////

//grab the cart per single user
//GET api/users/:id/cart/
router.get('/:id/cart/', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

//Update the cart per item added to each cart
//PUT api/users/:id/cart/
router.put('/:id/cart/', async (req, res, next) => {
  try {
    //decide what the req body looks like
    const cart = await Cart.findByPk(req.params.id);
    //what are we able to change per cart? Quantity?
    res.send(
      await cart.update({
        ...req.body,
        // itemNumber1: req.body.itemNumber1,
        // itemNumber2: req.body.itemNumber2,
      })
    );
  } catch (err) {
    next(err);
  }
});

// Are we trying to destroy carts per user? or maybe we can empty a cart at checkout
//PUT api/users/:id/cart/ EMPTY CART AT CHECKOUT
router.put('/:id/cart/', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    await cart.update({
      itemNumber1: 0,
      itemNumber2: 0,
    });
    res.send(cart);
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
