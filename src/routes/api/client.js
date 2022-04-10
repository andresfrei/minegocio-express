const express = require("express");
const router = express.Router();
const { validateFields, validateId } = require("../../validators/client");
const { getItem, getItems, createItem } = require("../../controllers/client");
const { isAdmin } = require("../../middleware/user");

router.get("/", getItems);
router.get("/:id", validateId, getItem);
router.post("/", isAdmin, validateFields, createItem);

module.exports = router;
