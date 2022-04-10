const express = require("express");
const router = express.Router();
const { validateId } = require("../../validators/product");
const { getItem, getItems } = require("../../controllers/product");

router.get("/", getItems);
router.get("/:id", validateId, getItem);
//router.post("/", validateFields, validatePasword, createItem);
//router.put("/:id", validateId, updateItem);
//router.delete("/:id", validateId, deleteItem);

module.exports = router;
