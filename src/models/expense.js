const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    date: { type: Date },
    description: { type: String, required: true },
    value: { type: Number, required: true },
    userId: { type: Types.ObjectId, required: true },
    accountId: { type: Types.ObjectId, required: true },
    locking: { type: Number },
    refId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("expenses", newSchema);
