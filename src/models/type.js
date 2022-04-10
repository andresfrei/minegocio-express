const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    id: Number,
    desc: String,
    sign: Number,
  },
  {
    versionKey: false,
  }
);

module.exports = model("Type", newSchema);
