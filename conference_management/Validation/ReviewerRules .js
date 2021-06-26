const { Validation } = require(".");
const { URegistrationRules, UserProfileUpdateRules } = require("./UserRules");

// reviewer registration rules
exports.RRegistrationRules = [...URegistrationRules];

exports.ReviewerProfileUpdateRules = (req) => {
  const { language_skill } = req.body;

  // add user profile rules
  var rules = UserProfileUpdateRules(req);

  // add reviewer profile rules
  if (language_skill) rules.push(Validation.text("language_skill"));

  return rules;
};
