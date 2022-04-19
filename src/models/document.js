const { Schema, model, Types } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const newSchema = new Schema(
  {
    date: { type: Date, required: true },
    typeId: { type: Number, required: true, enum: [1, 2] },
    customerId: { type: Types.ObjectId, required: true },
    products: [
      {
        productId: { type: Types.ObjectId, required: true, ref: "product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    total: { type: Number, default: 0 },

    isCountable: { type: Boolean, default: false },

    cashId: { type: Types.ObjectId },
    payment: { type: Number, default: 0 },
    rounded: { type: Number, default: 0 },

    userId: { type: Types.ObjectId, required: true },
    depositId: { type: Types.ObjectId, required: true },
    accountId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

newSchema.plugin(mongoosePaginate);

module.exports = model("document", newSchema);
