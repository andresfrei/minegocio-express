const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const {
  createDocument,
  deleteDocument,
  getDocumentByDeposit,
} = require("./document");

const typeId = 1; //Compra

const createItem = async (req, res) => {
  matchedData(req);
  try {
    req.body.typeId = typeId;
    return await createDocument(req, res);
  } catch (e) {
    handleHttpError(res, e);
  }
};

const getItemsByDeposit = async (req, res) => {
  req.body.typeId = typeId;
  req.body.select =
    "_id date customerId products total import isCountable cashId payment rounded userId depositId";
  return await getDocumentByDeposit(req, res);
};

const deleteItem = async (req, res) => {
  matchedData(req);
  try {
    req.body.typeId = typeId;
    return await deleteDocument(req, res);
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = { createItem, getItemsByDeposit, deleteItem };
