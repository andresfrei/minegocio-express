const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    buy: { type: Boolean, default: false },
    sale: { type: Boolean, default: true },
    isCountable: { type: Boolean, default: false },
    balance: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    accountId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("customer", newSchema);
