const Account = require("../models/account");
const jwt = require("jsonwebtoken");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { keyGenerator } = require("../utils/handleText");

const secret = process.env.JWT_SECRET;
const expire = process.env.JWT_EXPIRE;

async function register(req, res, next) {
  try {
    const body = matchedData(req);
    const account = new Account(body);
    account.password = await account.encryptPassword(body.password);
    account.key = await keyGenerator(8);
    await account.save();
    res.status(201);
    return res.json({ created: true });
  } catch (e) {
    handleHttpError(res, e);
  }
}

async function login(req, res) {
  try {
    const { email, password } = matchedData(req);
    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(501).json({ auth: false });
    }
    if (await account.comparePassword(password)) {
      return res.status(200).json({ token: createToken(account) });
    } else {
      return res.status(501).json({ auth: false });
    }
  } catch (e) {
    handleHttpError(res, e);
  }
}

async function logout(req, res) {
  return res.json({ token: "logout" });
}

function createToken(account) {
  return jwt.sign({ id: account._id, key: account.key }, secret, {
    expiresIn: expire,
  });
}

module.exports = { register, login, logout };
