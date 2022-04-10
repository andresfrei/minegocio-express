const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcryptjs");

const newSchema = new Schema(
  {
    username: { type: String },
    fullname: { type: String },
    password: { type: String },
    deposits: [{ type: Types.ObjectId, ref: "deposit" }],
    cashes: [{ type: Types.ObjectId, ref: "cash" }],
    accountId: { type: Types.ObjectId, ref: "account" },
    depositId: { type: Types.ObjectId, ref: "deposit" },
    cashId: { type: Types.ObjectId },
    isAdmin: { type: Boolean, default: false },
    key: { type: String },
    active: { type: Boolean, default: true },
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

module.exports = model("User", newSchema);
