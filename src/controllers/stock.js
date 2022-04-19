const cashFlow = require("../models/cashFlow");
const Stock = require("../models/stock");

const createStock = async (data) => {
  const stock = await Stock.insertMany(data);
  return stock;
};

const getStockByDeposit = async (req, res) => {
  const { query } = req.query;
  const depositId = req.session.user.depositId;
  const result = await Stock.aggregate([
    { $match: { query, depositId } },
    { $group: { _id: "$productId", stock: { $sum: "$stock" } } },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $project: {
        _id: 1,
        code: "$product.code",
        description: "$product.description",
        category: "$product.category",
        stock: 1,
      },
    },
  ]);
  const products = result.map((product) => {
    return {
      _id: product._id,
      code: product.code[0],
      description: product.description[0],
      category: product.category[0],
      stock: product.stock.toFixed(2),
    };
  });
  const data = { depositId, products };
  res.send({ data }).status(201);
};

const deleteStockByRef = async ({ typeId, refId }) => {
  await Stock.deleteMany({ typeId, refId });
};

module.exports = { createStock, getStockByDeposit, deleteStockByRef };
