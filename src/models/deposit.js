const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    name: { type: String },
    address: { type: String },
    phone: { type: String },
    accountId: { type: Types.ObjectId },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("deposits", newSchema);
