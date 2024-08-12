const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/RetailCart", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));
const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      unique: true,
      required: [true, "field Required"],
    },
    productName: {
      type: String,
      required: [true, "field Required"],
    },
    productCode: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    manufacturer: {
      type: String,
    },
    osType: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);
const ProductModel = mongoose.model("products", productSchema);
module.exports = ProductModel;
