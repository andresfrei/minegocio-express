const express = require("express");
const router = express.Router();
const { validateId } = require("../../validators/stock");
const { getStockByDeposit } = require("../../controllers/stock");

router.get("/", getStockByDeposit);
//router.get("/:id", validateId, getItem);
//router.post("/set/cashbox/:id", validateId, getItem);

module.exports = router;
