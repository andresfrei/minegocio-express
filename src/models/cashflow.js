const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    date: { type: Date, required: true },
    cashId: { type: Types.ObjectId, required: true },
    typeId: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9], required: true },
    refId: { type: Types.ObjectId, required: true },
    import: { type: Number, default: 0 },
    balanceId: { type: Types.ObjectId },
    accountId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("cash-flow", newSchema);
