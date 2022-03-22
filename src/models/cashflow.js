const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    date: { type: Date, required: true },
    typeId: { type: Number, enum: [3, 4, 5, 6, 7, 8, 9], required: true },
    descrition: { type: Types.ObjectId, required: true },
    sign: { type: Number, default: 1 },
    import: { type: Number, default: 0 },
    cashBoxId: { type: Types.ObjectId, required: true },
    userId: { type: Types.ObjectId, required: true },
    balanceId: { type: Types.ObjectId },
    accountId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("cashflows", newSchema);
