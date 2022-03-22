const express = require("express");
const router = express.Router();
const { login, logout, register } = require("../../controllers/auth");
const { validateLogin, validateRegister } = require("../../validators/auth");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);

module.exports = router;
