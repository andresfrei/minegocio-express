const jwt = require("jsonwebtoken");
const User = require("../models/user");

const secret = process.env.JWT_SECRET;

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(511).json({ auth: false });
  }
  const decoded = jwt.decode(token, secret);

  if (!decoded) {
    return res.status(511).json({ auth: false });
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(511).json({ auth: false });
  }

  req.session.user = user;
  next();
}

module.exports = { verifyToken };
