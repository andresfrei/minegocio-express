const { body } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateFields = [
  body("date").exists().notEmpty().isDate(),
  body("cashId").exists().notEmpty().isLength({ min: 24, max: 24 }),
  body("description").exists().notEmpty().trim(),
  body("costCenter").exists().notEmpty().trim(),
  body("import").exists().isFloat(),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validateFields };
