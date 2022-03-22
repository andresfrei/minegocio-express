const Cashbox = require("../models/cashbox");
const { Types } = require("mongoose");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const query = { name: body.name, accountId: req.session.accountId };
    const cashboxExist = await Cashbox.findOne(query);
    if (cashboxExist) {
      res.status(401).send({ error: "Category is exist !!!" });
    } else {
      const cashbox = new Cashbox(body);
      cashbox.accountId = Types.ObjectId(req.session.accountId);
      cashbox.key = req.session.account.key;
      await cashbox.save();
      res.status(201).send({ data: cashbox });
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
    const cashbox = await Cashbox.findOne(query);
    if (!cashbox) {
      res.status(404).send({ error: "Cashbox not found !!!" });
    } else res.status(200).send({ data: cashbox });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const getItems = async (req, res) => {
  matchedData(req);
  const query = { accountId: req.session.accountId };
  const cashbox = await Cashbox.find(query);
  res.send({ data: cashbox }).status(200);
};

const updateItem = async (req, res) => {
  try {
    matchedData(req);
    const query = {
      _id: req.params.id,
      accountId: req.session.accountId,
    };
    const cashbox = await Cashbox.findOne(query);
    if (!cashbox) {
      res.status(404).send({ error: "Cashbox not found !!!" });
    } else {
      Object.assign(cashbox, req.body);
      await cashbox.save();
      res.status(202).send({ data: cashbox });
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
    const cashbox = await Cashbox.findOne(query);
    if (!cashbox) {
      res.status(404).send({ error: "Cashbox not found !!!" });
    } else {
      await Cashbox.deleteOne(query);
      res.status(202).send({ msg: "Cashbox deleted" });
    }
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
