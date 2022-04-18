const Customer = require("../models/customer");

const example = {
  name: "CONSUMIDOR FINAL",
  address: "-----",
  phone: "-----",
  buy: true,
  sale: false,
  isCountable: false,
  active: true,
};

const createFinalConsumer = async (accountId) => {
  const cf = { ...example, accountId };
  const customer = await Customer.create(cf);
  return customer._id.toString();
};

module.exports = { createFinalConsumer };
