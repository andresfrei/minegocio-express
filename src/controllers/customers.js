const Customer = require("../models/customer");
const { Types } = require("mongoose");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const query = { name: body.name, accountId: req.session.accountId };
    const modelExist = await Customer.findOne(query);
    if (modelExist) {
      res.status(401).send({ error: "Customer is exist !!!" });
    } else {
      const customer = new Customer(body);
      customer.accountId = Types.ObjectId(req.session.accountId);
      await customer.save();
      res.status(201).send({ data: customer });
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
    const model = await customer.findOne(query);
    if (!model) {
      res.status(404).send({ error: "Customer not found !!!" });
    } else res.status(200).send({ data: model });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const getItems = async (req, res) => {
  matchedData(req);
  const query = { accountId: req.session.accountId };
  const model = await Customer.find(query);
  res.send({ data: model }).status(200);
};

const updateItem = async (req, res) => {
  try {
    matchedData(req);
    const query = {
      _id: req.params.id,
      accountId: req.session.accountId,
    };
    const model = await Customer.findOne(query);
    if (!model) {
      res.status(404).send({ error: "Customer not found !!!" });
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
    const model = await Customer.findOne(query);
    if (!model) {
      res.status(404).send({ error: "Customer not found !!!" });
    } else {
      await Customer.deleteOne(query);
      res.status(202).send({ msg: "Customer deleted" });
    }
  } catch (e) {
    handleHttpError(res, e);
  }
};

const updateBalance = async ({ _id, value }) => {
  console.log("VALUE", value);
  const model = await Customer.findById(_id);
  model.balance += value;
  await model.save();
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  updateBalance,
};
