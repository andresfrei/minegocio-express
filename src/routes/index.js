const { Router } = require("express");
const router = Router();

//Admin Routes
router.use("/admin", require("./admin"));

//API Routes
router.use("/api", require("./api"));

router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;
