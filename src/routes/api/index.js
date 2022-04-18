const epxress = require("express");
const res = require("express/lib/response");
const router = epxress.Router();
const { verifyToken, verifyDeposit } = require("../../middleware/user");

//Auth
router.use("/login", require("./login"));

//API

router.use("/user", verifyToken, require("./user"));
router.use("/products", verifyToken, verifyDeposit, require("./products"));

router.use("/buys", verifyToken, verifyDeposit, require("./buys"));
router.use("/stock", verifyToken, verifyDeposit, require("./stock"));
router.use("/cash", verifyToken, require("./cash"));

router.use("/customers", verifyToken, require("./customers"));
router.use("/types", verifyToken, require("./types"));

router.get("*", (req, res) => {
  res.status(404);
  res.send({ error: "Not found" });
});

module.exports = router;
