const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    cashboxId: { type: Types.ObjectId, required: true },
    types: [Object],
    balance: { type: Number },
    userId: { type: Types.ObjectId, required: true },
    accountId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("cashbalances", newSchema);
