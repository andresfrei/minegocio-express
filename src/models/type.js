const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
  {
    id: Number,
    description: String,
  },
  {
    versionKey: false,
  }
);

module.exports = model("types", newSchema);
