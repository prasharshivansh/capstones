exports.ValidateName = function (name) {
  const userNameRegex = new RegExp(/^[a-zA-Z\s'-]{2,}$/);
  if (userNameRegex.test(name)) {
    return true;
  } else {
    return false;
  }
};
exports.ValidatePassword = (password) => {
  const passwordRegex = new RegExp(/^.{6,}$/);
  if (passwordRegex.test(password)) {
    return true;
  } else {
    return false;
  }
};
exports.ValidatePhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = new RegExp(/^\d{10}$/);
  if (phoneNumberRegex.test(phoneNumber.toString())) {
    return true;
  } else {
    return false;
  }
};
