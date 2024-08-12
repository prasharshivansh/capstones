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
router.post("/signup", userController.newUser);
router.get("/tablets", productController.getTablets);
router.get("/mobiles", productController.getMobiles);
router.get("/carts", cartController.getAllCarts);
router.get("/carts/:username", cartController.getUserCart);
router.post("/carts", cartController.addToCart);
router.put("/carts/:username", cartController.updateCart);
module.exports = router;
