const Type = require("../models/type");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const getItem = async (req, res) => {
  try {
    matchedData(req);
    const query = {
      _id: req.params.id,
      accountId: req.session.accountId,
    };
    const model = await Type.findOne(query);
    if (!model) {
      res.status(404).send({ error: "Type not found !!!" });
    } else res.status(200).send({ data: model });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const getItems = async (req, res) => {
  matchedData(req);
  const query = { accountId: req.session.accountId };
  const model = await Type.find(query);
  res.send({ data: model }).status(200);
};

module.exports = { getItems, getItem };
