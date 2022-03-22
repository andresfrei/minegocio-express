const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require("../../validators/user");
const { verifyToken } = require("../../middleware/auth");
const {
  getItem,
  getItems,
  createItem,
  login,
} = require("../../controllers/users");

router.get("/", verifyToken, getItems);
router.post("/", verifyToken, validateRegister, createItem);
router.get("/id", verifyToken, getItem);
router.post("/login", validateLogin, login);

module.exports = router;
