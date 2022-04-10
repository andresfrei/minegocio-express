const { body, param } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateFields = [
  body("date").exists().notEmpty().isDate(),
  body("cashOut").exists().notEmpty().isLength({ min: 24, max: 24 }),
  body("cashIn").exists().notEmpty().isLength({ min: 24, max: 24 }),
  body("description").exists().notEmpty().trim(),
  body("import").exists().isFloat(),
  (req, res, next) => validateResult(req, res, next),
];

const validateId = [
  param("id").exists().notEmpty().isLength({ min: 24, max: 24 }),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validateFields, validateId };
