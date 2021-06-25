const { Validation } = require(".");

exports.LoginRules = [
  Validation.email(),
  Validation.password(),
  Validation.confirm_password(),
];

// user registration rules
exports.URegistrationRules = [
  Validation.text("firstName", 4, 20),
  Validation.text("lastName", 4, 20),
  Validation.phone(),
  Validation.unique_user_email(),
  Validation.password(),
  Validation.confirm_password(),
];
