const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    code: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: { type: Types.ObjectId, required: true },
    accountId: { type: Types.ObjectId, required: true },
    price: { type: Number, default: 0 },
    morePrice: { type: Array },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("products", newSchema);
