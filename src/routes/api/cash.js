const express = require("express");
const router = express.Router();
const {
  verifyCashParam,
  isAdmin,
  validCashTransfer,
} = require("../../middleware/user");
const { cashBalanceById } = require("../../controllers/cash");
const { create: newCashTransfer } = require("../../controllers/cashTransfer");
const { validateId } = require("../../validators/cash");
const { validateFields: trfFields } = require("../../validators/cashTransfer");

// Cash transfer
router.post(
  "/transfer",
  trfFields,
  isAdmin,
  validCashTransfer,
  newCashTransfer
);

router.get("/:id", validateId, verifyCashParam, cashBalanceById);

module.exports = router;
