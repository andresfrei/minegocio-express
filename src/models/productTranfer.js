const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    depositOut: { type: Types.ObjectId, required: true },
    depositIn: { type: Types.ObjectId, required: true },
    description: { type: Types.ObjectId, required: true },
    userId: { type: Types.ObjectId, required: true },
    accountId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("cashtranfers", newSchema);
