const epxress = require("express");
const res = require("express/lib/response");
const router = epxress.Router();
const { verifyToken, verifyDeposit } = require("../../middleware/user");

//Auth
router.use("/auth", require("./auth"));

//API
router.use("/user", verifyToken, require("./user"));
router.use("/product", verifyToken, verifyDeposit, require("./product"));

router.use("/buy", verifyToken, verifyDeposit, require("./buy"));
router.use("/stock", verifyToken, verifyDeposit, require("./stock"));
router.use("/cash", verifyToken, require("./cash"));

router.use("/client", verifyToken, require("./client"));
router.use("/resume", verifyToken, verifyDeposit, require("./resume"));
router.use("/type", verifyToken, require("./type"));

router.get("*", (req, res) => {
  res.status(404);
  res.send({ error: "Not found" });
});

module.exports = router;
