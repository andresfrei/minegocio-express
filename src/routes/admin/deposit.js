const express = require("express");
const router = express.Router();
const {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../../controllers/deposit");
const { validateFields, validateId } = require("../../validators/deposit");

router.get("/", getItems);
router.get("/:id", validateId, getItem);
router.post("/", validateFields, createItem);
router.put("/:id", validateId, updateItem);
router.delete("/:id", validateId, deleteItem);

module.exports = router;
