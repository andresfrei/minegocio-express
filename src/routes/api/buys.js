const express = require("express");
const router = express.Router();
const { validateFields, validateId } = require("../../validators/buy");
const { verifyCustomerBuy } = require("../../middleware/user");
const {
  createItem,
  getItemsByDeposit,
  deleteItem,
} = require("../../controllers/buy");

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

router.post("/", verifyCustomerBuy, createItem);
/**
 * @swagger
 * /api/buy:
 *  post:
 *    summary: Guarda una compra
 *    tags: [Buy]
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
 * /api/buy/{id}:
 *  delete:
 *    summary: Elimina una compra
 *    tags: [Buy]
 *    responses:
 *      201:
 *        description: Devuelve el ID de registro
 *    security:
 *      - userAuth: []
 */

module.exports = router;
