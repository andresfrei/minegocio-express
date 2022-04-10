const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    code: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    pricePurchase: { type: Number, default: 0 },
    priceSale: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    accountId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("product", newSchema);
