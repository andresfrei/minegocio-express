const Deposit = require("../models/deposit");
const { Types } = require("mongoose");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const query = { name: body.name, accountId: req.session.accountId };
    const modelExist = await Deposit.findOne(query);
    if (modelExist) {
      res.status(401).send({ error: "user is exist !!!" });
    } else {
      const user = new Deposit(body);
      user.accountId = Types.ObjectId(req.session.accountId);
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
    const model = await Deposit.findOne(query);
    if (!model) {
      res.status(404).send({ error: "Deposit not found !!!" });
    } else res.status(200).send({ data: model });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const getItems = async (req, res) => {
  matchedData(req);
  const query = { accountId: req.session.accountId };
  const model = await Deposit.find(query);
  res.send({ data: model }).status(200);
};

const updateItem = async (req, res) => {
  try {
    matchedData(req);
    const query = {
      _id: req.params.id,
      accountId: req.session.accountId,
    };
    const model = await Deposit.findOne(query);
    if (!model) {
      res.status(404).send({ error: "Deposit not found !!!" });
    } else {
      Object.assign(model, req.body);
      await model.save();
      res.status(202).send({ data: model });
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
    const model = await Deposit.findOne(query);
    if (!model) {
      res.status(404).send({ error: "Deposit not found !!!" });
    } else {
      await Deposit.deleteOne(query);
      res.status(202).send({ msg: "Deposit deleted" });
    }
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
