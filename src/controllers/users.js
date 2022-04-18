const User = require("../models/user");
const { Types } = require("mongoose");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { userToken } = require("../utils/handleToken");

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

async function getDeposits(req, res) {
  try {
    const { deposits } = req.session.user;
    const data = deposits.filter((item) => item.active);
    res.send({ data }).status(200);
  } catch (e) {
    handleHttpError(res, e);
  }
}

async function getCashes(req, res) {
  try {
    const { cashes } = req.session.user;
    const data = cashes.filter((item) => item.active);
    return res.status(200).send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
}

async function login(req, res) {
  try {
    const { username, key, password } = matchedData(req);
    const user = await User.findOne({ username, key });
    const active = user == null ? false : user.active;
    if (!active) {
      return res.status(401).json({ auth: false });
    }
    if (await user.comparePassword(password)) {
      const token = await userToken(user);
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ auth: false });
    }
  } catch (e) {
    handleHttpError(res, e);
  }
}

async function setDeposit(req, res) {
  try {
    matchedData(req);
    const { id } = req.params;
    const { deposits } = req.session.user;
    const depositId = deposits.find((deposit) => deposit._id.toString() === id);
    const active = depositId == null ? false : depositId.active;
    if (!active) {
      return res.status(401).json({ auth: false });
    }
    const _id = req.session.user._id.toString();
    const user = await User.findById(_id);
    user.depositId = depositId;
    await user.save();
    const token = await userToken(user);
    return res.status(201).json({ token });
  } catch (e) {
    handleHttpError(res, e);
  }
}

function home(req, res) {
  res.send({ user: req.session.user }).status(200);
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  login,
  setDeposit,
  getDeposits,
  getCashes,
  home,
};
