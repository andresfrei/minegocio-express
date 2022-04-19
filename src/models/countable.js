const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    date: { type: Date },
    customerId: { type: Types.ObjectId },
    typeId: { type: Number, required: true },
    refId: { type: Types.ObjectId, required: true },
    import: { type: Number },
    accountId: { type: Types.ObjectId },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("countable", newSchema);
