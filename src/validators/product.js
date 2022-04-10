const { body, param } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateFields = [
  body("code").exists().notEmpty().isLength({ min: 4, max: 8 }),
  body("description").exists().notEmpty().isLength({ min: 5, max: 20 }),
  body("categoryId").exists().notEmpty().isLength({ min: 24, max: 24 }),
  body("price").exists().notEmpty().isNumeric(),
  body("active").exists().isBoolean(),
  (req, res, next) => validateResult(req, res, next),
];

const validateId = [
  param("id").exists().notEmpty().isLength({ min: 24, max: 24 }),
  (req, res, next) => validateResult(req, res, next),
];

const validateFile = [
  param("id").exists().notEmpty().isLength({ min: 24, max: 24 }),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validateFields, validateId, validateFile };
