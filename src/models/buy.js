const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    date: { type: Date, required: true },
    clientId: { type: Types.ObjectId, required: true },
    products: [
      {
        productId: { type: Types.ObjectId, required: true, ref: "product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    total: { type: Number, default: 0 },

    isCountable: { type: Boolean, default: false },

    cashId: { type: Types.ObjectId },
    payment: { type: Number, default: 0 },
    rounded: { type: Number, default: 0 },

    userId: { type: Types.ObjectId, required: true },
    depositId: { type: Types.ObjectId, required: true },
    accountId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("buy", newSchema);
