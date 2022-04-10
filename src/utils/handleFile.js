const path = require("path");
const fs = require("fs");

const filesStoage = path.join(__dirname, "..", "..", "storage");

const readFileProductsCsv = (filename, divisor = ",", header = false) => {
  const filePath = path.join(filesStoage, filename);
  const file = fs.readFileSync(filePath, "utf-8");
  const data = file
    .slice(!header ? file.indexOf("\n") + 1 : 0)
    .split("\n")
    .map((line) => {
      let fileds = line.split(divisor);
      if (fileds[0]) {
        return {
          code: fileds[0],
          description: fileds[1].trim().toUpperCase(),
          category: fileds[2].trim().toUpperCase(),
          pricePurchase: fileds[3],
          priceSale: fileds[4].replace(/\r/, ""),
          active: true,
        };
      }
    });
  return data;
};

module.exports = { readFileProductsCsv };
