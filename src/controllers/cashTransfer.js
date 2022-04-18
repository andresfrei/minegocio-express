const CashTransfer = require("../models/cashTransfer");
const { Types } = require("mongoose");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { createCashflow } = require("./cashflow");

const create = async (req, res) => {
  matchedData(req);

  const data = req.body;
  data.userId = req.session.user._id;
  data.accountId = req.session.accountId;
  const trf = await CashTransfer.create(data);

  const cashFlowIn = { ...data };
  cashFlowIn.cashId = cashFlowIn.cashIn;
  cashFlowIn.typeId = 3;
  cashFlowIn.refId = trf._id;
  await createCashflow(cashFlowIn);

  const cashFlowOut = { ...data };
  cashFlowOut.cashId = cashFlowOut.cashOut;
  cashFlowOut.typeId = 4;
  cashFlowOut.import = cashFlowOut.import * -1;
  cashFlowOut.refId = trf._id;
  await createCashflow(cashFlowOut);

  res.send(trf);
};

module.exports = {
  create,
};
