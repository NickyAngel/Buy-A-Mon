const router = require("express").Router();
const {
  models: { Item },
} = require("../db");
module.exports = router;

//Grabbing all items from the DB
//api/items/
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

//Grabbing a single item from the DB
//api/items/:id
router.get("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

//Create the item as an admin
//POST api/items/:id/

// router.post("/:id/create/", async (req, res, next) => {
//   try {
//     //decide what the req body looks like
//     const item = await Item.create(req.body);
//     res.status(201).send(item);
//   } catch (err) {
//     next(err);
//   }
// });

//Update the item as an admin
//PUT api/items/:id/
// router.put("/:id/", async (req, res, next) => {
//   try {
//     const item = await Item.findByPk(req.params.id);
//     await item.update({ ...item, ...req.body });
//     res.send(item);
//   } catch (err) {
//     next(err);
//   }
// });

//Delete the item if admin is deleting
//DELETE api/items/:id

// router.delete("/:id/", async (req, res, next) => {
//   try {
//     const item = await Item.findByPk(req.params.id);
//     await item.destroy(req.params.id);
//     res.send(item);
//   } catch (err) {
//     next(err);
//   }
// });

//add in prefilled out sections
// item.update({name: req.body.name,
//   price: req.body.price,
//   imageUrl: req.body.imageUrl,
//   description: req.body.description,
//    ...item})
//decide what the req body looks like
// const item = await Item.findByPk(req.params.id);
//what are we able to change per cart? Quantity?
// res.send(
// await item.update({
//   ...req.body,
// title: req.body.title,
// price: req.body.price,
// })
// );
// const AllItems = await Item.findAll();
