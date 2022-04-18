const express = require("express");
const router = express.Router();
//const { login, logout, register } = require("../../controllers/auth");
//const { validateLogin, validateRegister } = require("../../validators/auth");
const { verifyToken } = require("../../middleware/auth");

//Auth Routes
router.use("/auth", require("./auth"));

//Admin Routes
router.use("/users", verifyToken, require("./users"));
router.use("/customers", verifyToken, require("./customers"));
router.use("/deposits", verifyToken, require("./deposits"));
router.use("/products", verifyToken, require("./products"));
router.use("/cashes", verifyToken, require("./cashes"));

module.exports = router;
