const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validCash } = require("../utils/handleUserMiddleware");

const secret = process.env.JWT_SECRET;

async function verifyToken(req, res, next) {
  const token = req.headers.auth;
  if (!token) {
    return res.status(401).json({ auth: false });
  }
  const decoded = jwt.decode(token, secret);
  if (!decoded) {
    return res.status(401).json({ auth: false });
  }
  const user = await User.findById(decoded.id)
    .select([
      "_id",
      "username",
      "fullname",
      "deposits",
      "cashes",
      "isAdmin",
      "active",
      "depositId",
      "accountId",
    ])
    .populate("deposits", ["_id", "name", "address", "active"])
    .populate("cashes", ["_id", "name", "balance", "block", "active"]);

  const active = user == null ? false : user.active;
  if (!active) {
    return res.status(401).json({ auth: false });
  }
  req.session.user = user;
  req.session.accountId = user.accountId.toString();
  next();
}

async function verifyDeposit(req, res, next) {
  if (!req.session.user.depositId) {
    return res.status(403).json({ msg: "Set deposit required !!!" });
  }
  const id = req.session.user.depositId.toString();
  const { deposits } = req.session.user;
  const deposit = deposits.find((deposit) => deposit._id.toString() === id);
  if (!deposit.active) {
    return res.status(403).json({ auth: false });
  }
  next();
}

async function verifyCash(req, res, next) {
  const { cashes } = req.session.user;
  const { cashId } = req.body;
  const resul = validCash(cashes, cashId);
  resul.status == 403 ? res.status(403).send(resul.msg) : next();
}

async function validCashTransfer(req, res, next) {
  const { cashes } = req.session.user;
  const { cashIn, cashOut } = req.body;
  let resul = validCash(cashes, cashOut);
  if (resul.status == 403) {
    res.status(403).send("CashOut invalid !!!");
  }
  resul = validCash(cashes, cashIn);
  resul.status == 403 ? res.status(403).send("CashIn invalid !!!") : next();
}

async function verifyCashParam(req, res, next) {
  const { cashes } = req.session.user;
  const { id } = req.params;
  const cash = cashes.find((i) => i._id.toString() === id);
  const active = !cash ? false : cash.active;
  if (!active) {
    return res.status(403).json({ msg: "Invalid cash used" });
  }
  next();
}

async function isAdmin(req, res, next) {
  if (!req.session.user.isAdmin) {
    return res.status(403).json({ msg: "Requires administrator permissions" });
  }
  next();
}

module.exports = {
  verifyToken,
  verifyDeposit,
  isAdmin,
  verifyCash,
  verifyCashParam,
  validCashTransfer,
};
