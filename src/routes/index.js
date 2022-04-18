const { Router } = require("express");
const router = Router();

//Admin Routes
router.use("/admin", require("./admin"));

router.use("/api", require("./api"));

router.get("/", (req, res) => {
  res.render("index");
});

router.get("*", (req, res) => {
  res.status(404);
  res.render("404");
});

module.exports = router;
