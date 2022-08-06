const router = require("express").Router();
const {
  models: { User, Item },
} = require("../db");
module.exports = router;

function administratorCheck(req, res, next) {
  if (req.user.role === "administrator") {
    next();
  } else {
    return res.sendStatus(401);
  }
}

router.get("/", administratorCheck, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email"],
    });
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.post("/:id/create/", administratorCheck, async (req, res, next) => {
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
router.put("/:id/", administratorCheck, async (req, res, next) => {
  try {
    //decide what the req body looks like
    const item = await Item.findByPk(req.params.id);
    //what are we able to change per cart? Quantity?
    res.send(
      await item.update({
        ...req.body,
        // title: req.body.title,
        // price: req.body.price,
      })
    );
  } catch (err) {
    next(err);
  }
});

//Delete the item if admin is deleting
//DELETE api/items/:id
router.delete("/:id/", administratorCheck, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.destroy(req.params.id);
    res.send(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

// talk to team about token and logged in

// const requireToken = async (req, res, next) => {
//     try {
//       const token = req.headers.authorization;
//       const user = await User.findByToken(token);
//       req.user = user;
//       next();
//     } catch (e) {
//       next(e);
//     }
//   };
