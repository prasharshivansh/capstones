var express = require("express");
var router = express.Router();
const userController = require("../controller/userController");
const productController = require("../controller/productController");
const cartController = require("../controller/cartController");
/**
 * @swagger
 * /login:
 *   get:
 *     summary: API to fetch the admin.
 *     description: Retrieve the admin data.
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: No notes available in the repo
 */
router.get("/login", userController.getUser);
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: API to add new users.
 *     description: Creates a new users by inserting new users credentials to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 description: username of the new user
 *                 type: String
 *                 example: Shivansh
 *               password:
 *                 description: password of the new user
 *                 type: String
 *                 example: Shiv@123
 *               phoneNumber:
 *                  description: phone number of the new user
 *                  type: String
 *                  example:9876543210
 *               email:
 *                  description: email of the new user
 *                  type: String
 *                  example:pra@gmail.com
 *        responses:
 *              200:
 *                description: User Created
 *              400:
 *                description: Username already registered
 */
router.post("/signup", userController.newUser);
router.get("/tablets", productController.getTablets);
router.get("/mobiles", productController.getMobiles);
router.get("/carts", cartController.getAllCarts);
router.get("/carts/:username", cartController.getUserCart);
router.post("/carts", cartController.addToCart);
router.put("/carts/:username", cartController.updateCart);
router.delete("/products/:product", productController.removeProducts);
router.all("*", userController.wrongPath);
module.exports = router;
