const express = require("express");
const router = express.Router();
const { validateFields } = require("../../validators/buy");
const { verifyCash } = require("../../middleware/user");
const { createItem, getItemsByDeposit } = require("../../controllers/buy");

router.get("/", getItemsByDeposit);
/**
 * @swagger
 * /api/buy?query:
 *  get:
 *    summary: Listado de compras
 *    tags: [Buy]
 *    responses:
 *      201:
 *        description: Devuelve el ID de registro
 *    security:
 *      - userAuth: []
 */

//router.get("/:id", validateId, getItem);

router.post("/", verifyCash, createItem);
/**
 * @swagger
 * /api/buy:
 *  post:
 *    summary: Guarda una compra
 *    tags: [Buy]
 *    responses:
 *      201:
 *        description: Devuelve el ID de registro
 *    security:
 *      - userAuth: []
 */

//router.put("/:id", validateId, updateItem);
//router.delete("/:id", validateId, deleteItem);

module.exports = router;
