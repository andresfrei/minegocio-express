const Cashflow = require("../models/cashFlow");
const { Types } = require("mongoose");

const createCashflow = async (data) => {
  const cashflow = await Cashflow.create(data);
  return cashflow._id.toString();
};

const cashflowBalanceById = async (id) => {
  const cashId = Types.ObjectId(id);
  const resul = await Cashflow.aggregate([
    { $match: { cashId, balanceId: { $exists: false } } },
    { $group: { _id: "$cashId", balance: { $sum: "$import" } } },
  ]);
  const balance = resul.length == 0 ? 0 : resul[0].balance;
  return { cashId: id, balance };
};

module.exports = { cashflowBalanceById, createCashflow };
