const { Validation } = require(".");
const { UserEnum } = require("../models/UserModel");

exports.LoginRules = [Validation.email(), Validation.password()];

// for public registration
exports.PRegistration = [Validation.includes("role", UserEnum.MEMBER.value)];

// for administrators registration (except members)
exports.ProtectedRegistration = [
  Validation.includes(
    "role",
    UserEnum.ADMIN.value,
    UserEnum.EDITOR.value,
    UserEnum.REVIEWER.value
  ),
];

// for any user reistration
exports.URegistrationRules = [
  Validation.text("firstName", 4, 20),
  Validation.text("lastName", 4, 20),
  Validation.phone(),
  Validation.unique_user_email(),
  Validation.password(),
  Validation.confirm_password(),
  Validation.includes(
    "role",
    UserEnum.ADMIN.value,
    UserEnum.EDITOR.value,
    UserEnum.REVIEWER.value,
    UserEnum.MEMBER.value
  ),
];

exports.UserProfileUpdateRules = (req) => {
  const { firstName, lastName, phone, email } = req.body;
  var rules = [];

  if (firstName) rules.push(Validation.text("firstName", 4, 20));
  if (lastName) rules.push(Validation.text("lastName", 4, 20));
  if (phone) rules.push(Validation.phone());
  if (email) rules.push(Validation.unique_user_email());

  return rules;
};

exports.UpdatePasswordRules = [
  Validation.boolean("logOutAllDevices"),
  Validation.password(),
  Validation.confirm_password(),
];

exports.RecoverPasswordRules = [Validation.email()];

exports.ResetPasswordRules = [
  ...this.UpdatePasswordRules,
  Validation.text("token"),
];
