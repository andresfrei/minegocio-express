const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcryptjs");

const newSchema = new Schema(
  {
    username: { type: String },
    description: { type: String },
    password: { type: String },
    deposits: [{ type: Types.ObjectId }],
    cashboxs: [{ type: Types.ObjectId }],
    accountId: { type: Types.ObjectId },
    lastDepositId: { type: Types.ObjectId },
    rol: { type: String, enum: ["user", "admin"], default: "user" },
    active: { type: Boolean, default: true },
    key: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

newSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

newSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model("users", newSchema);
