const { body, param } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateLogin = [
  body("username").exists().notEmpty().isLength({ min: 5, max: 15 }),
  body("key").exists().notEmpty().isLength({ min: 8, max: 8 }),
  (req, res, next) => validateResult(req, res, next),
];

const validatePasword = [
  body("password").exists().notEmpty().isLength({ min: 6, max: 15 }),
  (req, res, next) => validateResult(req, res, next),
];

const validateFields = [
  body("username").exists().notEmpty().trim(),
  body("username").isLength({ min: 5, max: 15 }),
  body("username")
    .custom((value) => !/\s/.test(value))
    .withMessage("No spaces are allowed in the name"),
  body("fullname").exists().notEmpty().trim(),
  body("active").exists().notEmpty().isBoolean(),
  body("cashes").isArray(),
  body("deposits").isArray(),
  body("isAdmin").isBoolean(),
  (req, res, next) => validateResult(req, res, next),
];
const validateId = [
  param("id").exists().notEmpty().isLength({ min: 24, max: 24 }),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = {
  validateLogin,
  validatePasword,
  validateFields,
  validateId,
};
