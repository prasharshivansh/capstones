const ProductModel = require("../Model/productsSchema");
const validators = require("../Utilities/validator");

exports.getTablets = async (req, res) => {
  try {
    const products = await ProductModel.find(
      { productCode: /TAB/ },
      { _id: 0, __v: 0 }
    );
    if (products.length > 0) {
      res.status(200).json({
        status: "SUCCESS",
        data: products,
      });
    } else {
      res.status(400).json({
        status: "SUCCESS",
        message: "No Products found",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "FAILED",
      message: err.message,
    });
  }
};

exports.getMobiles = async (req, res) => {
  try {
    const products = await ProductModel.find(
      { productCode: /MOB/ },
      { _id: 0, __v: 0 }
    );
    if (products.length > 0) {
      res.status(200).json({
        status: "SUCCESS",
        data: products,
      });
    } else {
      res.status(400).json({
        status: "SUCCESS",
        message: "No Products found",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "FAILED",
      message: err.message,
    });
  }
};

exports.removeProducts = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.deleteOne({
      productCode: req.params.product,
    });
    if (deletedProduct.deletedCount > 0) {
      res.status(200).json({
        status: "SUCCESS",
        message: `${req.params.product} successfully deleted`,
      });
    } else {
      res.status(400).json({
        status: "SUCCESS",
        message: `${req.params.product} not available`,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "ERROR",
      message: err.message,
    });
  }
};
