const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/RetailCart", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));
const cartSchema = new mongoose.Schema(
  {
    cartId: {
      type: Number,
      unique: true,
      required: [true, "field Required"],
    },
    username: {
      type: String,
      required: [true, "field Required"],
    },
    productsInCart: {
      type: [Object, String],
    },
    statusOfCart: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);
const CartModel = mongoose.model("cart", cartSchema);
module.exports = CartModel;
