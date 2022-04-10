const Document = require("../models/document");
const ProductFlow = require("../models/productflow");
const { handleHttpError } = require("../utils/handleError");

const createItem = async (data) => {
  try {
    const { header, body } = data;
    const document = await Document.create(header);
    const documentId = document.documentId.toString();
    const items = body.map((item) => ({ ...item, documentId }));
    await ProductFlow.insertMany(items);
    return document;
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = { createItem };
