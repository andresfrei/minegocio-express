const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    typeId: { type: Number, enum: [1, 2, 6, 7, 8, 9], required: true },
    depositId: { type: Types.ObjectId, required: true },
    clientId: { type: Types.ObjectId, required: true },
    total: { type: Number, default: 0 },
    cashFlowId: { type: Types.ObjectId, required: true },
    userId: { type: Types.ObjectId, required: true },
    accountId: { type: Types.ObjectId, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = model("documents", newSchema);
