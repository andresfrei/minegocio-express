const express = require("express");
const router = express.Router();
const { validateLogin } = require("../../validators/user");
const { verifyToken } = require("../../middleware/user");
const { getItem, getItems, login } = require("../../controllers/users");

router.get("/", verifyToken, getItems);
router.get("/id", verifyToken, getItem);
router.post("/login", validateLogin, login);

module.exports = router;
