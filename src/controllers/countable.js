const ClientAccount = require("../models/countable");

const createCountable = async (data) => {
  const clientAccount = await ClientAccount.create(data);
  return clientAccount;
};

module.exports = { createCountable };
