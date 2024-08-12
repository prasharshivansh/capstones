const UserModel = require("../Model/usersSchema");
const validators = require("../Utilities/validator");

exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.find(
      { username: "admin1", password: "admin" },
      { _id: 0, __v: 0 }
    );
    if (user.length > 0) {
      res.status(200).json({
        status: "success",
        message: "admin available",
        data: user,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "admin not available",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.newUser = async (req, res) => {
  try {
    const userExists = await UserModel.findOne({ username: req.body.username });
    if (userExists) {
      res.status(400).json({
        status: "error",
        messsage: "User already registered",
      });
    } else {
      if (validators.ValidateName(req.body.username)) {
        if (validators.ValidatePassword(req.body.password)) {
          if (validators.ValidatePhoneNumber(req.body.phoneNumber)) {
            const newUser = await UserModel.create(req.body);
            res.status(200).json({
              status: "success",
              message: `User Registered with Name: ${req.body.username}`,
            });
          } else {
            res.status(400).json({
              status: "error",
              message: "Phone number should be 10 digits",
            });
          }
        } else {
          res.status(400).json({
            status: "error",
            message: "Minimum 5 characters should be there in password",
          });
        }
      } else {
        res.status(400).json({
          status: "error",
          message: "Invalid username",
        });
      }
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.wrongPath = async (req, res) => {
  res.status(404).json({
    message: "Resource not found",
  });
};
