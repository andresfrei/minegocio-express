const CashTransfer = require("../models/cashTransfer");
const { Types } = require("mongoose");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const create = (req, res) => {
  matchedData(req);
  const trf = req.body;
  trf.userId = req.session.user._id;
  trf.accountId = req.session.accountId;
  res.send(trf);
};

module.exports = {
  create,
};
