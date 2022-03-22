const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty(),
  (req, res, next) => validateResult(req, res, next),
];

const validateRegister = [
  check("firstname").exists().notEmpty(),
  check("lastname").exists().notEmpty(),
  check("phone").exists().notEmpty(),
  check("address").exists().notEmpty(),
  check("city").exists().notEmpty(),
  check("state").exists().notEmpty(),
  check("country").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 6, max: 15 }),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validateLogin, validateRegister };
