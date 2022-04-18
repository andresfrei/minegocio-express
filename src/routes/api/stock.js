const express = require("express");
const router = express.Router();
const { validateId } = require("../../validators/stock");
const { getStockByDeposit } = require("../../controllers/stock");

router.get("/", getStockByDeposit);
/**
 * @swagger
 * /api/stock:
 *  get:
 *    summary: Retorna un objeto data con Array de Stock de productos
 *    tags: [Products]
 *    responses:
 *      200:
 *        description: Lista de prodctos de la cuenta
 *    security:
 *      - userAuth: []
 */

//router.get("/:id", validateId, getItem);
//router.post("/set/cashbox/:id", validateId, getItem);

module.exports = router;
