const { validationResult, check } = require("express-validator"); //TODO:

const validCash = (cashes, cashId) => {
  const cash = cashes.find((i) => i._id.toString() === cashId);
  const active = !cash ? false : cash.active;
  if (!active) {
    return { status: 401, msg: "Invalid cash used" };
  }
  if (cash.block) {
    return { status: 401, msg: "Cashbox is block" };
  }
  return { status: 200 };
};

module.exports = { validCash };
