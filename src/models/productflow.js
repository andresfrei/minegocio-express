const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    date: { type: Date, required: true },
    typeId: { type: Number, enum: [1, 2, 6, 7, 8, 9], required: true },
    productId: { type: Types.ObjectId, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    sign: { type: Number, enum: [1, -1], default: 1 },
    stock: { type: Number, default: 0 },
    depositId: { type: Types.ObjectId, required: true },
    accountId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("productflows", newSchema);
