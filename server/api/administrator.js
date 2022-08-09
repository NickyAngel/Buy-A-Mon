const router = require("express").Router();
const {
  models: { User, Item },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

function adminCheck(req, res, next) {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).send("YOU SHALL NOT PASS");
  }
}

router.get("/", requireToken, adminCheck, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email"],
    });
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.post(
  "/:id/create/",
  requireToken,
  adminCheck,
  async (req, res, next) => {
    try {
      //decide what the req body looks like
      const item = await Item.create(req.body);
      res.status(201).send(item);
    } catch (err) {
      next(err);
    }
  }
);

//Update the item as an admin
//PUT api/items/:id/
router.put("/:id/", requireToken, adminCheck, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.update({ ...item, ...req.body });
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
    res.send(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
