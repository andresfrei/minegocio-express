const express = require("express");
const router = express.Router();

const { getCashFlow } = require("../../../controllers/cashflow");
const { validateId } = require("../../../validators/cashFlow");
const { verifyCashParam } = require("../../../middleware/user");

router.get("/:id", validateId, verifyCashParam, getCashFlow);
/**
 * @swagger
 * /api/cash/{id}/flow?query:
 *  get:
 *    summary: Consulta de movimientos de caja
 *    tags: [Cash]
 *    responses:
 *      201:
 *        description: Objeto data con los movimientos
 *    security:
 *      - userAuth: []
 */

module.exports = router;
