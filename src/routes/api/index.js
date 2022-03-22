const epxress = require("express");
const router = epxress.Router();
//const fs = require("fs");
const { verifyToken } = require("../../middleware/user");

router.use("/auth", require("./auth"));
//router.use("/deposit", verifyToken, require("./deposit"));
router.use("/user", verifyToken, require("./user"));
//router.use("/product", verifyToken, require("./product"));

router.get("*", (req, res) => {
  res.status(404);
  res.send({ error: "Not found" });
});

module.exports = router;

/* const pathRouter = `${__dirname}`;

const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

fs.readdirSync(pathRouter).filter((file) => {
  const fileWithOutExt = removeExtension(file);
  const skip = ["index"].includes(fileWithOutExt);
  if (!skip) {
    router.use(
      `/${fileWithOutExt}`,
      verifyToken,
      require(`./${fileWithOutExt}`)
    );
  }
}); */
