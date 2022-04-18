const ClientAccount = require("../models/countable");
const { updateBalance } = require("./customers");

const createCountable = async (data) => {
  const clientAccount = await ClientAccount.create(data);
  const _id = data.customerId;
  const value = data.import;
  console.log(data);
  await updateBalance({ _id, value });
  return clientAccount;
};

module.exports = { createCountable };
