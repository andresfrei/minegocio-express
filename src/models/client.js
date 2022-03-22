const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    accountId: { type: Types.ObjectId, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("clients", newSchema);
