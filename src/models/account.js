const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcryptjs");

const AccountSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    status: { type: Number, enum: [0, 1, 2, 3], default: 0 },
    key: { type: String },
    active: { type: Boolean, default: false },
    defaultClientId: { type: Types.ObjectId },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

AccountSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

AccountSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model("account", AccountSchema);
