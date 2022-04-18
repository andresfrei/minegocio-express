const express = require("express");
const router = express.Router();
const { validateId, validatePasword } = require("../../validators/user");
const {
  getItem,
  setDeposit,
  getDeposits,
  getCashes,
  home,
} = require("../../controllers/users");

/**
 * @swagger
 * components:
 *  schemas:
 *    Deposit:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: the auto-generated id of deposit
 *        name:
 *          type: string
 *          description: the name of the deposit
 *        address:
 *          type: string
 *          description: addres of the deposit
 *      required:
 *        - name
 *        - description
 *    DepositNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found deposit
 *      example:
 *        msg: Deposit was not found
 *
 *  parameters:
 *    depositId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the deposit id
 */

router.get("/home", home);
/**
 * @swagger
 * /api/user/home:
 *  get:
 *    summary: Retorna un objeto User con datos del usuario logueado, depositos y cajas
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Datos del ususario logueado
 *    security:
 *      - userAuth: []
 */

router.get("/deposits", getDeposits);
/**
 * @swagger
 * /api/user/deposits:
 *  get:
 *    summary: Retorna un objeto data con Array de depostios
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Lista de depositos del usuario
 *    security:
 *      - userAuth: []
 */

router.get("/cashes", getCashes);
/**
 * @swagger
 * /api/user/cashes:
 *  get:
 *    summary: Retorna un objeto data con Array de cajas
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Lista de cajas del usuario
 *    security:
 *      - userAuth: []
 */

router.put("/set/deposit/:id", validateId, setDeposit);
/**
 * @swagger
 * /api/user/set/deposit/{id}:
 *  put:
 *    summary: Define el deposito seleccionado
 *    tags: [User]
 *    parameters:
 *      - $ref: '#/components/parameters/depositId'
 *    responses:
 *      200:
 *        description: settings is successful
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/userToken'
 *      404:
 *        description: ivalid setting
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DepositNotFound'
 *    security:
 *      - userAuth: []
 */

router.get("/:id", validateId, getItem);

//router.post("/set/cashbox/:id", validateId, getItem);

module.exports = router;
