const Client = require("../models/client");

const example = {
  name: "CONSUMIDOR FINAL",
  address: "-----",
  phone: "-----",
  buy: true,
  sale: false,
  clientAccount: false,
  active: true,
};

const createFinalConsumer = async (accountId) => {
  const cf = { ...example, accountId };
  const client = await Client.create(cf);
  return client._id.toString();
};

module.exports = { createFinalConsumer };
