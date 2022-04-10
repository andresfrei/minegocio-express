const Cash = require("../models/cash");
const { Types } = require("mongoose");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { cashflowBalanceById } = require("./cashflow");

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const query = { name: body.name, accountId: req.session.accountId };
    const CashExist = await Cash.findOne(query);
    if (CashExist) {
      res.status(401).send({ error: "Cash is exist !!!" });
    } else {
      const cash = new Cash(body);
      cash.accountId = Types.ObjectId(req.session.accountId);
      cash.key = req.session.account.key;
      await cash.save();
      res.status(201).send({ data: cash });
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
    const cash = await Cash.findOne(query);
    if (!cash) {
      res.status(404).send({ error: "Cash not found !!!" });
    } else res.status(200).send({ data: cash });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const getItems = async (req, res) => {
  matchedData(req);
  const { accountId } = req.session;
  const data = await Cash.find({ accountId });
  res.send({ data }).status(200);
};

const updateItem = async (req, res) => {
  try {
    matchedData(req);
    const query = {
      _id: req.params.id,
      accountId: req.session.accountId,
    };
    const cash = await Cash.findOne(query);
    if (!cash) {
      res.status(404).send({ error: "Cash not found !!!" });
    } else {
      Object.assign(cash, req.body);
      await cash.save();
      res.status(202).send({ data: Cash });
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
    const Cash = await Cash.findOne(query);
    if (!Cash) {
      res.status(404).send({ error: "Cash not found !!!" });
    } else {
      await Cash.deleteOne(query);
      res.status(202).send({ msg: "Cash deleted" });
    }
  } catch (e) {
    handleHttpError(res, e);
  }
};

const cashBalanceById = async (req, res) => {
  matchedData(req);
  const { id } = req.params;
  const data = await cashflowBalanceById(id);
  res.send(data).status(200);
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  cashBalanceById,
};
