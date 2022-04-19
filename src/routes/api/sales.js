const express = require("express");
const router = express.Router();
const { validateFields, validateId } = require("../../validators/sale");
const { verifyCustomerBuy } = require("../../middleware/user");
const {
  createItem,
  getItemsByDeposit,
  deleteItem,
} = require("../../controllers/sale");

router.get("/", getItemsByDeposit);
/**
 * @swagger
 * /api/sale?query:
 *  get:
 *    summary: Listado de ventas
 *    tags: [Sale]
 *    responses:
 *      201:
 *        description: Devuelve el ID de registro
 *    security:
 *      - userAuth: []
 */

//router.get("/:id", validateId, getItem);

router.post("/", verifyCustomerBuy, createItem);
/**
 * @swagger
 * /api/sale:
 *  post:
 *    summary: Guarda una venta
 *    tags: [Sale]
 *    responses:
 *      200:
 *        description: Devuelve Ok
 *    security:
 *      - userAuth: []
 */

//router.put("/:id", validateId, updateItem);

router.delete("/:id", validateId, deleteItem);
/**
 * @swagger
 * /api/sale/{id}:
 *  delete:
 *    summary: Elimina una venta
 *    tags: [Sale]
 *    responses:
 *      201:
 *        description: Devuelve el ID de registro
 *    security:
 *      - userAuth: []
 */

module.exports = router;
