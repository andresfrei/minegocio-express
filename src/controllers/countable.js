const ClientAccount = require("../models/countable");
const { updateBalance } = require("./customers");

const createCountable = async (data) => {
  const clientAccount = await ClientAccount.create(data);
  const { customerId } = data;
  const value = data.import;
  await updateBalance({ customerId, value });
  return clientAccount;
};

const deleteCountableByRef = async ({ customerId, typeId, refId }) => {
  const data = await ClientAccount.findOne({ customerId, typeId, refId });
  const value = data.import * -1; //Invierto valor para anular
  await updateBalance({ customerId, value });
  await data.remove();
  return true;
};

module.exports = { createCountable, deleteCountableByRef };
