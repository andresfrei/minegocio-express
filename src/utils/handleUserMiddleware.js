const { validationResult, check } = require("express-validator"); //TODO:

const validCash = async (cashes, cashId) => {
  const cash = await cashes.find((i) => i._id.toString() === cashId);
  const active = !cash ? false : cash.active;
  if (!active) {
    return { status: 403, msg: "Invalid cash used" };
  }
  if (cash.block) {
    return { status: 403, msg: "Cashbox is block" };
  }
  return { status: 200 };
};

module.exports = { validCash };
