const { body, param } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateFields = [
  body("name").exists().notEmpty().trim(),
  body("name")
    .custom((value) => !/\s/.test(value))
    .withMessage("No spaces are allowed in the name"),
  body("active").exists().isBoolean(),
  (req, res, next) => validateResult(req, res, next),
];

const validateId = [
  param("id").exists().notEmpty().isLength({ min: 24, max: 24 }),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validateFields, validateId };
