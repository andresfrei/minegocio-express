const express = require("express");
const router = express.Router();
const {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../../controllers/cash");
const { validateFields, validateId } = require("../../validators/cash");

router.get("/", getItems);
router.get("/:id", validateId, getItem);
router.post("/", validateFields, createItem);
router.patch("/:id", validateId, validateFields, updateItem);
router.delete("/:id", validateId, deleteItem);

module.exports = router;
