const OrderModel = require("../Model/orderSchema");
const CartModel = require("../Model/cartSchema");

async function generateUniqueOrderId() {
  const generatedOrderId = () => Math.floor(Math.random() * 900) + 1000;
  const checkIdExists = async (id) => {
    const order = await OrderModel.findOne({ orderId: id });
    return order !== null;
  };
  const generateUniqueIdRecursive = async () => {
    const id = generatedOrderId();
    const exists = await checkIdExists(id);
    if (exists) {
      return generateUniqueIdRecursive();
    } else {
      return id;
    }
  };
  return await generateUniqueIdRecursive();
}

exports.placeOrder = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ username: req.params.username });
    cart.statusOfCart = "Closed";
    const updatedCart = await CartModel.findOneAndUpdate(
      { cartId: cart.cartId },
      cart,
      {
        new: true, //to return new doc back
        runValidators: true, //to run the validators which specified in the model
      }
    );
    console.log(updatedCart);
    const order = {
      orderId: await generateUniqueOrderId()
        .then((orderId) => orderId)
        .catch((err) => console.log(err.message)),
      cartId: cart.cartId,
    };
    console.log(order);
    const createdOrder = await OrderModel.create(order);
    res.status(200).json({
      status: "SUCCESS",
      message: `Order placed successfully with orderId: ${createdOrder.orderId}`,
    });
  } catch (err) {
    res.status(404).json({
      status: "ERROR",
      message: err.message,
    });
  }
};
