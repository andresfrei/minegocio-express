const { body, param } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateFields = [
  body("date").exists().notEmpty(),
  body("clientId").exists().notEmpty().isLength({ min: 24, max: 24 }),
  body("total").exists().notEmpty().isNumeric(),
  body("isAccount").exists().notEmpty().isBoolean(),
  body("cashboxId").exists().notEmpty().isLength({ min: 24, max: 24 }),
  (req, res, next) => validateResult(req, res, next),
];

const validateId = [
  param("id").exists().notEmpty().isLength({ min: 24, max: 24 }),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validateFields, validateId };
