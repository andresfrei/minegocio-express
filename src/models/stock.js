const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    date: { type: Date, required: true },
    typeId: { type: Number, enum: [1, 2, 6, 7, 8, 9], required: true },
    refId: { type: Types.ObjectId, required: true },
    depositId: { type: Types.ObjectId, required: true },
    productId: { type: Types.ObjectId, ref: "product" },
    stock: { type: Number, default: 0 },
    accountId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("stock", newSchema);
