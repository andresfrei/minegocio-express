const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    date: { type: Date, required: true },
    cashOut: { type: Types.ObjectId, required: true },
    cashIn: { type: Types.ObjectId, required: true },
    description: { type: String },
    import: { type: Number, default: 0 },
    userId: { type: Types.ObjectId, required: true },
    accountId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("cash-transfer", newSchema);
