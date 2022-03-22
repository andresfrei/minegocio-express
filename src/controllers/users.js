const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { Types } = require("mongoose");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const secret = process.env.JWT_SECRET;
const expire = process.env.JWT_EXPIRE;

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const query = { username: body.username, accountId: req.session.accountId };
    const userExist = await User.findOne(query);
    if (userExist) {
      res.status(401).send({ error: "username is exist !!!" });
    } else {
      const user = new User(body);
      user.password = await user.encryptPassword(body.password);
      user.accountId = Types.ObjectId(req.session.accountId);
      user.key = req.session.account.key;
      await user.save();
      res.status(201).send({ data: user });
    }
  } catch (e) {
    handleHttpError(res, e);
  }
};

const getItem = async (req, res) => {
  try {
    matchedData(req);
    const query = {
      _id: req.params.id,
      accountId: req.session.accountId,
    };
    const user = await User.findOne(query);
    if (!user) {
      res.status(404).send({ error: "User not found !!!" });
    } else res.status(200).send({ data: user });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const getItems = async (req, res) => {
  matchedData(req);
  const query = { accountId: req.session.accountId };
  const user = await User.find(query);
  res.send({ data: user }).status(200);
};

const updateItem = async (req, res) => {
  try {
    matchedData(req);
    const query = {
      _id: req.params.id,
      accountId: req.session.accountId,
    };
    const user = await User.findOne(query);
    if (!user) {
      res.status(404).send({ error: "User not found !!!" });
    } else {
      Object.assign(user, req.body);
      await user.save();
      res.status(202).send({ data: user });
    }
  } catch (e) {
    handleHttpError(res, e);
  }
};

const deleteItem = async (req, res) => {
  try {
    matchedData(req);
    const query = {
      _id: req.params.id,
      accountId: req.session.accountId,
    };
    const user = await User.findOne(query);
    if (!user) {
      res.status(404).send({ error: "User is not found !!!" });
    } else {
      await User.deleteOne(query);
      res.status(202).send({ msg: "User deleted" });
    }
  } catch (e) {
    handleHttpError(res, e);
  }
};

async function login(req, res) {
  try {
    matchedData(req);
    const body = matchedData(req);
    body.active = true;
    const user = await User.findOne(body);
    if (!user) {
      return res.status(501).json({ auth: false });
    }
    req.session.user = user;
    req.session.depositId = user.lastDepositId.toString();
    return res.status(200).json({
      token: createToken(user),
      depositId: req.session.depositId,
    });
  } catch (e) {
    handleHttpError(res, e);
  }
}

function createToken(user) {
  return jwt.sign({ id: user._id }, secret, {
    expiresIn: expire,
  });
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  login,
};
