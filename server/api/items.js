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
router.post("/:id/create/", async (req, res, next) => {
  try {
    //decide what the req body looks like
    const item = await Item.create(req.body);
    res.status(201).send(item);
  } catch (err) {
    next(err);
  }
});

//Update the item as an admin
//PUT api/items/:id/
router.put("/:id/", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    const picture = req.body.imageUrl == '' ? item.imageUrl : req.body.imageUrl
    const summary = req.body.description == '' ? item.description : req.body.description
    
    await item.update({...item, ...req.body, imageUrl: picture, description: summary})

    res.send(item)
  } catch (err) {
    next(err);
  }
});

//Delete the item if admin is deleting
//DELETE api/items/:id
router.delete("/:id/", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.destroy(req.params.id);
    res.send(item);
  } catch (err) {
    next(err);
  }
});
