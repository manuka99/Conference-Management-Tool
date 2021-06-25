const { Validation } = require(".");
const { URegistrationRules } = require("./AuthenticationRules");

// member registration rules
exports.MRegistrationRules = [
  ...URegistrationRules,
  // Validation.date("date_of_birth"),
  Validation.text("address", 10, 150),
];
