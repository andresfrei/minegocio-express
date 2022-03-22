const express = require("express");
const router = express.Router();
const {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../../controllers/cashbox");
const { validateFields, validateId } = require("../../validators/cashbox");

router.get("/", getItems);
router.get("/:id", validateId, getItem);
router.post("/", validateFields, createItem);
router.patch("/:id", validateId, validateFields, updateItem);
router.delete("/:id", validateId, deleteItem);

module.exports = router;
