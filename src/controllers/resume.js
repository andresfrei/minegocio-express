const Product = require("../models/product");
const { Types } = require("mongoose");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const res = require("express/lib/response");

const getStock = () => {
  return res.status(200).json({ msg: "stock" });
};

module.exports = { getStock };
