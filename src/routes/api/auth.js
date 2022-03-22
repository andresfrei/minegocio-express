const express = require("express");
const router = express.Router();
const { login } = require("../../controllers/users");
const { validateLogin } = require("../../validators/user");

router.post("/login", validateLogin, login);
//router.post("/logout", validateLogin, login);

module.exports = router;
