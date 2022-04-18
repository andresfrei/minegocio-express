const express = require("express");
const router = express.Router();

const { create } = require("../../../controllers/cashExpence");
const { validateFields } = require("../../../validators/cashExpence");

router.post("/", validateFields, create);
/**
 * @swagger
 * /api/cash/expence:
 *  post:
 *    summary: Graba un gasto en caja
 *    tags: [Cash]
 *    responses:
 *      200:
 *        description: endPoint para registro de gastos
 *    security:
 *      - userAuth: []
 */

module.exports = router;
