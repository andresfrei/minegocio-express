const express = require("express");
const router = express.Router();
const { validateFields, validateId } = require("../../validators/customer");
const {
  getItem,
  getItems,
  createItem,
} = require("../../controllers/customers");

router.get("/", getItems);
router.get("/:id", validateId, getItem);
router.post("/", validateFields, createItem);

module.exports = router;
