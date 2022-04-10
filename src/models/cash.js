const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    name: { type: String, required: true },
    balance: { type: Number, default: 0 },
    accountId: { type: Types.ObjectId, required: true },
    block: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("cash", newSchema);
