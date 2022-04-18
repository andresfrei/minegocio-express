const express = require("express");
const router = express.Router();
const { validateId } = require("../../validators/product");
const { getItem, getItems } = require("../../controllers/product");

router.get("/", getItems);
/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Retorna un objeto data con Array de Productos
 *    tags: [Products]
 *    responses:
 *      200:
 *        description: Lista de prodctos de la cuenta
 *    security:
 *      - userAuth: []
 */

router.get("/:id", validateId, getItem);
//router.post("/", validateFields, validatePasword, createItem);
//router.put("/:id", validateId, updateItem);
//router.delete("/:id", validateId, deleteItem);

module.exports = router;
