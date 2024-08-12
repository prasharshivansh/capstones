const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/RetailCart", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: {
        messsage: "User already registered",
      },
      required: [true, "Username Required"],
    },
    password: {
      type: String,
      required: [true, "Password Required"],
    },
    phoneNumber: {
      type: Number,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);
const UserModel = mongoose.model("retailcustomer", usersSchema);
module.exports = UserModel;
