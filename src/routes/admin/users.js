const express = require("express");
const router = express.Router();
const {
  validateFields,
  validatePasword,
  validateId,
} = require("../../validators/user");

const {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../../controllers/users");

router.get("/", getItems);
router.get("/:id", validateId, getItem);
router.post("/", validateFields, validatePasword, createItem);
router.patch("/:id", validateId, validateFields, updateItem);
router.delete("/:id", validateId, deleteItem);

module.exports = router;
