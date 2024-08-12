const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/RetailCart", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));
const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      unique: true,
      required: [true, "field Required"],
    },
    cartId: {
      type: String,
      required: [true, "field Required"],
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);
const OrderModel = mongoose.model("orders", orderSchema);
module.exports = OrderModel;
