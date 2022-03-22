const jwt = require("jsonwebtoken");
const Account = require("../models/account");

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
  const account = await Account.findById(decoded.id);
  if (!account) {
    return res.status(511).json({ auth: false });
  }
  req.session.accountId = decoded.id;
  req.session.account = account;
  next();
}

module.exports = { verifyToken };
