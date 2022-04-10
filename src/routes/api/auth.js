const express = require("express");
const router = express.Router();
const { login } = require("../../controllers/users");
const { validateLogin, validatePasword } = require("../../validators/user");

router.post("/login", validateLogin, validatePasword, login);

module.exports = router;
