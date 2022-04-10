const express = require("express");
const router = express.Router();
const { getStock } = require("../../controllers/resume");

router.get("/stock", getStock);

module.exports = router;
