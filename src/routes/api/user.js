const express = require("express");
const router = express.Router();
const { validateId, validatePasword } = require("../../validators/user");
const {
  getItem,
  getItems,
  setDeposit,
  getDeposits,
  getCashes,
} = require("../../controllers/users");

router.get("/", getItems);
router.get("/deposits", getDeposits);
router.post("/deposit/set/:id", validateId, setDeposit);
router.get("/cashes", getCashes);
router.get("/:id", validateId, getItem);
//router.post("/set/cashbox/:id", validateId, getItem);

module.exports = router;
