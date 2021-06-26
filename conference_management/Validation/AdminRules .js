const { Validation } = require(".");
const { URegistrationRules, UserProfileUpdateRules } = require("./UserRules");

// admin registration rules
exports.ARegistrationRules = [...URegistrationRules];

exports.AdminProfileUpdateRules = (req) => {
  const { about } = req.body;

  // add user profile rules
  var rules = UserProfileUpdateRules(req);

  // add admin profile rules
  if (about) rules.push(Validation.text("about"));

  return rules;
};
