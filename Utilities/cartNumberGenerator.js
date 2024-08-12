const CartModel = require("../Model/cartSchema");

exports.cartNumberGenerator = () => {
  let isUnique = false;
  let cartNumber = 0;
  while (!isUnique) {
    cartNumber = Math.floor(Math.random() * 90) + 100;
    const cartExists = CartModel.findOne({ cartId: cartNumber });
    isUnique = !cartExists;
  }
  return cartNumber;
};
