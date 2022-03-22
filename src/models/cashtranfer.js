const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    cashBoxOut: { type: Types.ObjectId, required: true },
    cashBoxIn: { type: Types.ObjectId, required: true },
    description: { type: Types.ObjectId, required: true },
    import: { type: Number, default: 0 },
    userId: { type: Types.ObjectId, required: true },
    accountId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("cashtranfers", newSchema);
