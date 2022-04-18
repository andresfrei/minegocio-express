const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { createCashflow } = require("./cashflow");

const create = async (req, res) => {
  matchedData(req);

  const data = req.body;
  data.userId = req.session.user._id;
  data.accountId = req.session.accountId;
  data.import = data.import * -1;
  data.typeId = 6;

  const id = await createCashflow(data);

  res.send({ id }).status(201);
};

module.exports = {
  create,
};
