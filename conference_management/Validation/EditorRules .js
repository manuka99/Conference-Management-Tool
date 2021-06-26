const { Validation } = require(".");
const { URegistrationRules, UserProfileUpdateRules } = require("./UserRules");

// editor registration rules
exports.ERegistrationRules = [...URegistrationRules];

exports.EditorProfileUpdateRules = (req) => {
  const { writing_skill } = req.body;

  // add user profile rules
  var rules = UserProfileUpdateRules(req);

  // add editor profile rules
  if (writing_skill) rules.push(Validation.text("writing_skill"));

  return rules;
};
