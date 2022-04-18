const express = require("express");
const router = express.Router();

const { create } = require("../../../controllers/cashAdjustment");
const { validateFields } = require("../../../validators/cashAdjustment");

router.post("/", validateFields, create);
/**
 * @swagger
 * /api/cash/adjustment:
 *  post:
 *    summary: Graba un ajuste en caja
 *    tags: [Cash]
 *    responses:
 *      200:
 *        description: endPoint para registro de un ajuste de caja
 *    security:
 *      - userAuth: []
 */

module.exports = router;
