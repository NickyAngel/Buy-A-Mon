const router = require("express").Router();
const {
  models: { Item },
} = require("../db");
const User = require("../db/models/User");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
const adminCheck = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).send("YOU SHALL NOT PASS");
  }
};
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

router.post("/create/", requireToken, adminCheck, async (req, res, next) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).send(item);
  } catch (err) {
    next(err);
  }
});

//Update the item as an admin
//PUT api/items/:id/

router.put("/:id/", requireToken, adminCheck, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    const picture = req.body.imageUrl == "" ? item.imageUrl : req.body.imageUrl;
    const summary =
      req.body.description == "" ? item.description : req.body.description;

    await item.update({
      ...item,
      ...req.body,
      imageUrl: picture,
      description: summary,
    });

    res.send(item);
  } catch (err) {
    next(err);
  }
});

//Delete the item if admin is deleting
//DELETE api/items/:id

router.delete("/:id/", requireToken, adminCheck, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.destroy(req.params.id);
    console.log(req.params.id);
    res.send(item);
  } catch (err) {
    next(err);
  }
});

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
