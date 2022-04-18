const Buy = require("../models/buy");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { createCountable } = require("./countable");
const { createStock } = require("./stock");
const { createCashflow } = require("./cashflow");

const stock = require("../models/stock");

const typeId = 1;
const paymentSing = -1;
const stockSign = 1;

const createItem = async (req, res) => {
  matchedData(req);
  try {
    const body = req.body;
    body.userId = req.session.user._id;
    body.depositId = req.session.user.depositId;
    body.accountId = req.session.accountId;
    const buy = await Buy.create(body);

    const payment = {
      date: buy.date,
      typeId,
      customerId: buy.customerId,
      cashId: buy.cashId,
      refId: buy._id.toString(),
      import: buy.payment * paymentSing,
      accountId: buy.accountId,
    };

    buy.isCountable
      ? await createCountable(payment)
      : await createCashflow(payment);

    //Create Stock
    const data = buy.products;
    const stock = data.map((doc) => ({
      ...doc,
      date: buy.date,
      typeId,
      refId: buy._id.toString(),
      productId: doc.productId,
      stock: doc.quantity * stockSign,
      depositId: buy.depositId,
      accountId: buy.accountId,
    }));
    await createStock(stock);

    return res.status(201).send({ data: buy });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const getItemsByDeposit = async (req, res) => {
  const query = req.query;
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const sort = req.query.page || "-_id";
  query.depositId = req.session.user.depositId;
  const select =
    "_id date customerId products total import isCountable cashId payment rounded userId depositId";
  const data = await Buy.paginate(query, { select, limit, page, sort });
  res.status(200).send({ data });
};

module.exports = { createItem, getItemsByDeposit };
