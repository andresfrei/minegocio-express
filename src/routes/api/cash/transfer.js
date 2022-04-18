const express = require("express");
const router = express.Router();

const { create } = require("../../../controllers/cashtransfer");
const { validateFields } = require("../../../validators/cashTransfer");

router.post("/", validateFields, create);
/**
 * @swagger
 * /api/cash/transfer:
 *  post:
 *    summary: Transferencia de saldos de cajas
 *    tags: [Cash]
 *    responses:
 *      201:
 *        description: id del registro
 *    security:
 *      - userAuth: []
 */

module.exports = router;
