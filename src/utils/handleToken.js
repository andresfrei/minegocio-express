const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expire = process.env.JWT_EXPIRE;

async function accountToken(account) {
  return await jwt.sign({ id: account._id, key: account.key }, secret, {
    expiresIn: expire,
  });
}

async function userToken(user) {
  return await jwt.sign(
    { id: user._id, userId: user.userId, depositId: user.depositId },
    secret,
    {
      expiresIn: expire,
    }
  );
}

module.exports = { accountToken, userToken };
