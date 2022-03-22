const bcrypt = require("bcryptjs");

export async function passwordEncript(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
