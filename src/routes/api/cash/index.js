const express = require("express");
const router = express.Router();
const { isAdmin } = require("../../../middleware/user");
const { getCashFlow } = require("../../../controllers/cashflow");
const { getItem: getCash } = require("../../../controllers/cash");
const { validateId } = require("../../../validators/cashFlow");
const { verifyCashParam } = require("../../../middleware/user");

router.use("/adjustment", isAdmin, require("./adjustment"));
router.use("/transfer", isAdmin, require("./transfer"));

router.use("/expence", require("./expence"));

router.get("/:id/flow", validateId, verifyCashParam, getCashFlow);
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

router.get("/:id", validateId, verifyCashParam, getCash);
/**
 * @swagger
 * /api/cash/{id}:
 *  get:
 *    summary: Consulta saldo en caja
 *    tags: [Cash]
 *    responses:
 *      201:
 *        description: Objeto data con los movimientos
 *    security:
 *      - userAuth: []
 */

module.exports = router;
