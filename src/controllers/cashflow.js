const Cashflow = require("../models/cashFlow");
const { Types } = require("mongoose");
const { updateBalance } = require("./cash");

const createCashflow = async (data) => {
  const cashflow = await Cashflow.create(data);
  const cashId = data.cashId.toString();
  const value = cashflow.import;
  await updateBalance({ cashId, value });
  return cashflow._id.toString();
};

const getCashFlow = async (req, res) => {
  const query = req.query;
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const sort = req.query.page || "-_id";

  query.cashId = req.params.id;
  const select = "_id date typeId description refId import userId";
  const data = await Cashflow.paginate(query, { select, limit, page, sort });
  res.status(200).send({ data });
};

module.exports = { createCashflow, getCashFlow };
