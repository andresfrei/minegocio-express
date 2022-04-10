const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { keyGenerator } = require("../utils/handleText");
const { accountToken } = require("../utils/handleToken");
const Account = require("../models/account");
const { createFinalConsumer } = require("../utils/handleClients");

async function register(req, res, next) {
  try {
    const body = matchedData(req);
    const account = new Account(body);
    account.password = await account.encryptPassword(body.password);
    account.key = await keyGenerator(8);
    const accountId = account._id.toString();
    const defaultClientId = await createFinalConsumer(accountId);
    account.defaultClientId = defaultClientId;
    await account.save();
    res.status(201);
    return res.json({ created: true });
  } catch (e) {
    handleHttpError(res, e);
  }
}

async function login(req, res) {
  try {
    const { email, password } = matchedData(req);
    const account = await Account.findOne({ email });
    const active = account == null ? false : account.active;
    if (!active) {
      return res.status(401).json({ auth: false });
    }
    if (await account.comparePassword(password)) {
      const token = await accountToken(account);
      return res.status(201).json({ token });
    } else {
      return res.status(401).json({ auth: false });
    }
  } catch (e) {
    handleHttpError(res, e);
  }
}

module.exports = { register, login };
