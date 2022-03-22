const { body, param } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateLogin = [
  body("username").exists().notEmpty().isLength({ min: 5, max: 15 }),
  body("password").exists().notEmpty(),
  body("key").exists().notEmpty().isLength({ min: 6, max: 6 }),
  (req, res, next) => validateResult(req, res, next),
];

const validatePasword = [
  body("password").exists().notEmpty().isLength({ min: 6, max: 15 }),
  (req, res, next) => validateResult(req, res, next),
];

const validateFields = [
  body("username").exists().notEmpty().trim(),
  body("username").isLength({ min: 8, max: 15 }),
  body("username")
    .custom((value) => !/\s/.test(value))
    .withMessage("No spaces are allowed in the name"),
  body("description").exists().notEmpty().trim(),
  body("active").exists().notEmpty().isBoolean(),
  body("cashboxs").isArray(),
  body("deposits").isArray(),
  body("rol").exists().notEmpty(),
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
