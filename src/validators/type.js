const { param } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateId = [
  param("id").exists().notEmpty().isLength({ min: 24, max: 24 }),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validateId };
