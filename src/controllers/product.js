const Product = require("../models/product");
const { Types } = require("mongoose");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const query = { code: body.code, accountId: req.session.accountId };
    const productExist = await Product.findOne(query);
    if (productExist) {
      res.status(401).send({ error: "Product is exist !!!" });
    } else {
      const product = new Product(body);
      product.accountId = Types.ObjectId(req.session.accountId);
      await product.save();
      res.status(201).send({ data: product });
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
    const product = await Product.findOne(query);
    if (!product) {
      res.status(404).send({ error: "Product not found !!!" });
    } else res.status(200).send({ data: product });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const getItems = async (req, res) => {
  matchedData(req);
  const query = { accountId: req.session.accountId };
  const product = await Product.find(query);
  res.send({ data: product }).status(200);
};

const updateItem = async (req, res) => {
  try {
    matchedData(req);
    const query = {
      _id: req.params.id,
      accountId: req.session.accountId,
    };
    const product = await Product.findOne(query);
    if (!product) {
      res.status(404).send({ error: "Product not found !!!" });
    } else {
      Object.assign(product, req.body);
      await product.save();
      res.status(202).send({ data: product });
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
    const product = await Product.findOne(query);
    if (!product) {
      res.status(404).send({ error: "Product not found !!!" });
    } else {
      await Product.deleteOne(query);
      res.status(202).send({ msg: "Product deleted" });
    }
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
