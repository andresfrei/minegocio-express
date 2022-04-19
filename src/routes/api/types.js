const express = require("express");
const router = express.Router();
const { getTypes } = require("../../utils/handleTypes");

router.get("/", (req, res) => {
  const types = getTypes();
  res.status(200).send({ types });
});
/**
 * @swagger
 * /api/types:
 *  get:
 *    summary: Tipos de movimienos
 *    tags: [Types]
 *    responses:
 *      201:
 *        description: Devuelve Objeto con tipos de movimientos
 *    security:
 *      - userAuth: []
 */

module.exports = router;
