const express = require("express");
const router = express.Router();
const {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
  uploadFile,
} = require("../../controllers/product");
const { validateFields, validateId } = require("../../validators/product");

router.get("/", getItems);
router.get("/:id", validateId, getItem);
router.post("/", validateFields, createItem);
router.put("/:id", validateId, updateItem);
router.delete("/:id", validateId, deleteItem);
router.post("/upload", uploadFile);
module.exports = router;
