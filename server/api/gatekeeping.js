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
const adminCheck = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).send(console.log("YOU SHALL NOT PASS"));
  }
};
module.exports = { adminCheck, requireToken };
