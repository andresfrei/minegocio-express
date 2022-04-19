const Document = require("../models/document");
const { handleHttpError } = require("../utils/handleError");
const { createCountable, deleteCountableByRef } = require("./countable");
const { createStock, deleteStockByRef } = require("./stock");
const { createCashflow, deleteCashFlowByRef } = require("./cashflow");
const { validCash } = require("../utils/handleUserMiddleware");
const { userSessionOrAdmin } = require("../middleware/user");
const { getTypeById } = require("../utils/handleTypes");

const createDocument = async (req, res) => {
  const { body } = req;
  body.userId = req.session.user._id;
  body.depositId = req.session.user.depositId;
  body.accountId = req.session.accountId;
  const doc = await Document.create(body);

  const type = getTypeById(body.typeId);

  const payment = {
    date: doc.date,
    typeId: doc.typeId,
    customerId: doc.customerId.toString(),
    cashId: doc.cashId,
    refId: doc._id.toString(),
    import: doc.payment * type.payment,
    accountId: doc.accountId,
  };
  doc.isCountable
    ? await createCountable(payment)
    : await createCashflow(payment);

  const refId = doc._id.toString();
  const products = doc.products;
  const stock = products.map((item) => ({
    ...doc,
    date: doc.date,
    typeId: doc.typeId,
    refId,
    productId: item.productId,
    stock: item.quantity * type.stock,
    depositId: doc.depositId,
    accountId: doc.accountId,
  }));

  await createStock(stock);
  res.status(201).send({ id: doc._id.toString() });
};

const getDocumentByDeposit = async (req, res) => {
  const { query } = req;
  query.typeId = req.body.typeId;
  query.depositId = req.session.user.depositId;
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const sort = req.query.page || "-_id";
  const { select } = req.body;
  const data = await Document.paginate(query, { select, limit, page, sort });
  res.status(200).send({ data });
};

const deleteDocument = async (req, res) => {
  const { id } = req.params;
  const { typeId } = req.body;
  const depositId = req.session.user.depositId.toString();
  const data = await Document.findOne({ _id: id, depositId, typeId });
  if (!data) {
    return res.status(404).send({ msg: "Document no found" });
  }
  const isUserAccess = await userSessionOrAdmin(req, data.userId);
  if (!isUserAccess) {
    return res.status(403).send({ msg: "You do not have access permission" });
  }
  const refId = data._id.toString();
  if (data.isCountable) {
    const { customerId } = data;
    await deleteCountableByRef({ customerId, typeId, refId });
  } else {
    const { cashes } = req.session.user;
    const cashId = data.cashId.toString();
    const isCash = await validCash(cashes, cashId);
    if (isCash.status == 403) {
      return res.status(403).send({ msg: isCash.msg });
    }
    await deleteCashFlowByRef({ cashId, typeId, refId });
  }
  await deleteStockByRef({ typeId, refId });
  await data.remove();
  res.status(200).send({ msg: "Document deleted" });
};

module.exports = { createDocument, deleteDocument, getDocumentByDeposit };
