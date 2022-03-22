const Categoty = require("../models/category");
const { Types } = require("mongoose");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const query = { name: body.name, accountId: req.session.accountId };
    const categoryExist = await Categoty.findOne(query);
    if (categoryExist) {
      res.status(401).send({ error: "Category is exist !!!" });
    } else {
      const category = new Categoty(body);
      category.accountId = Types.ObjectId(req.session.accountId);
      category.key = req.session.account.key;
      await category.save();
      res.status(201).send({ data: category });
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
    const category = await Categoty.findOne(query);
    if (!category) {
      res.status(404).send({ error: "Categoty not found !!!" });
    } else res.status(200).send({ data: category });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const getItems = async (req, res) => {
  matchedData(req);
  const query = { accountId: req.session.accountId };
  const category = await Categoty.find(query);
  res.send({ data: category }).status(200);
};

const updateItem = async (req, res) => {
  try {
    matchedData(req);
    const query = {
      _id: req.params.id,
      accountId: req.session.accountId,
    };
    const category = await Categoty.findOne(query);
    if (!category) {
      res.status(404).send({ error: "Categoty not found !!!" });
    } else {
      Object.assign(category, req.body);
      await category.save();
      res.status(202).send({ data: category });
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
    const category = await Categoty.findOne(query);
    if (!category) {
      res.status(404).send({ error: "Categoty not found !!!" });
    } else {
      await Categoty.deleteOne(query);
      res.status(202).send({ msg: "Categoty deleted" });
    }
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
