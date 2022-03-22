const express = require("express");
const router = express.Router();
//const { login, logout, register } = require("../../controllers/auth");
//const { validateLogin, validateRegister } = require("../../validators/auth");
const { verifyToken } = require("../../middleware/auth");

//Auth Routes
router.use("/auth", require("./auth"));

//Admin Routes
router.use("/user", verifyToken, require("./user"));
router.use("/deposit", verifyToken, require("./deposit"));
router.use("/category", verifyToken, require("./categoty"));
router.use("/product", verifyToken, require("./product"));
router.use("/cashbox", verifyToken, require("./cashbox"));

module.exports = router;
