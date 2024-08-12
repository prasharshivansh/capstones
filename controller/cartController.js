const CartModel = require("../Model/cartSchema");

async function generateUniqueCardId() {
  const generatedCardId = () => Math.floor(Math.random() * 90) + 100;
  const checkIdExists = async (id) => {
    const cart = await CartModel.findOne({ cartId: id });
    return cart !== null;
  };
  const generateUniqueIdRecursive = async () => {
    const id = generatedCardId();
    const exists = await checkIdExists(id);
    if (exists) {
      return generateUniqueIdRecursive();
    } else {
      return id;
    }
  };
  return await generateUniqueIdRecursive();
  //return Math.floor(Math.random() * 90) + 100;
}
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await CartModel.find({}, { _id: 0, __v: 0 });
    if (carts.length > 0) {
      res.status(200).json({
        status: "SUCCESS",
        data: carts,
      });
    } else {
      res.status(400).json({
        status: "SUCCESS",
        message: "No Carts found",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "ERROR",
      message: err.message,
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const cartExists = await CartModel.findOne({ username: req.body.username });
    if (cartExists) {
      let productsInCarts1 = [
        ...cartExists.productsInCart,
        ...req.body.productsInCart,
      ];
      const cart = {
        username: cartExists.username,
        productsInCart: productsInCarts1,
        cartId: cartExists.cartId,
        StatusOfCart: cartExists.statusOfCart,
      };
      await CartModel.findOneAndUpdate({ username: req.body.username }, cart, {
        new: true, //to return new doc back
        runValidators: true, //to run the validators which specified in the model
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "User's cart is already available, append to the same cart",
        data: cart,
      });
    } else {
      let newCart = {
        cartId: await generateUniqueCardId()
          .then((cartId) => cartId)
          .catch((err) => console.log(err.message)),
        username: req.body.username,
        productsInCart: req.body.productsInCart,
        StatusOfCart: "Open",
      };
      console.log(newCart);
      const cart = await CartModel.create(newCart);
      res.status(200).json({
        status: "SUCCESS",
        data: cart,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "ERROR",
      message: err.message,
    });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const cart = await CartModel.find(
      { username: req.params.username },
      { _id: 0, __v: 0 }
    );
    if (cart.length > 0) {
      res.status(200).json({
        status: "SUCCESS",
        data: cart,
      });
    } else {
      res.status(400).json({
        status: "SUCCESS",
        message: `No Cart found for ${req.params.username}`,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "ERROR",
      message: err.message,
    });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const cartExists = await CartModel.findOne({
      username: req.params.username,
    });
    if (cartExists) {
      console.log(cartExists);
      const cart = {
        cartId: cartExists.cartId,
        productsInCart: [
          ...cartExists.productsInCart,
          ...req.body.productsInCart,
        ],
        statusOfCart: cartExists.statusOfCart,
        username: cartExists.username,
      };
      console.log(cart);
      const updatedCart = await CartModel.findOneAndUpdate(
        { cartId: cartExists.cartId },
        cart,
        {
          new: true, //to return new doc back
          runValidators: true, //to run the validators which specified in the model
        }
      );
      console.log(updatedCart);
      res.status(200).json({
        status: "SUCCESS",
        message: `CartID: ${cartExists.cartId} updated`,
      });
    } else {
      res.status(400).json({
        status: "SUCCESS",
        message: "User's cart is not available",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "FAILED",
      message: err.message,
    });
  }
};
