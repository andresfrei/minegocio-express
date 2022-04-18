const { Schema, model, Types } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const newSchema = new Schema(
  {
    date: { type: Date, required: true },
    cashId: { type: Types.ObjectId, required: true },
    typeId: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9], required: true },
    description: { type: String },
    costCenter: { type: String },
    refId: { type: Types.ObjectId },
    import: { type: Number, default: 0 },
    userId: { type: Types.ObjectId },
    balanceId: { type: Types.ObjectId },
    accountId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

newSchema.plugin(mongoosePaginate);

module.exports = model("cash-flow", newSchema);
