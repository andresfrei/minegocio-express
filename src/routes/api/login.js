const express = require("express");
const router = express.Router();
const { login } = require("../../controllers/users");
const { validateLogin, validatePasword } = require("../../validators/user");

router.post("/", validateLogin, validatePasword, login);
/**
 * Post user login
 * @openapi
 * /api/login:
 *    post:
 *      tags:
 *        - Login
 *      summary: "Login de usuario"
 *      description: Endpoint logueo de usuario de app
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/userLogin"
 *      responses:
 *        '200':
 *          description: Retorna token validacion.
 *        '401':
 *          description: Error de validacion.
 */

module.exports = router;
