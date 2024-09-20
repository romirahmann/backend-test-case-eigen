/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login member
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
var express = require("express");
var router = express.Router();
const AuthController = require("../../controller/auth_controller/authController");

// auth
router.post("/login", AuthController.login);

module.exports = router;
