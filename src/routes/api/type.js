const express = require("express");
const router = express.Router();
const { validateId } = require("../../validators/type");
const { getItem, getItems } = require("../../controllers/type");

router.get("/", getItems);
router.get("/id", validateId, getItem);

module.exports = router;
