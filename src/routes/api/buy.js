const express = require("express");
const router = express.Router();
const { validateFields } = require("../../validators/buy");
const { verifyCash } = require("../../middleware/user");
const { createItem, getItems } = require("../../controllers/buy");

router.get("/", getItems);
//router.get("/:id", validateId, getItem);
router.post("/", verifyCash, createItem);
//router.put("/:id", validateId, updateItem);
//router.delete("/:id", validateId, deleteItem);

module.exports = router;
