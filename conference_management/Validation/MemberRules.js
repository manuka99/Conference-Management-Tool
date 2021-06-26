const { Validation } = require(".");
const { MemberEnum } = require("../models/UserModel");
const { URegistrationRules, UserProfileUpdateRules } = require("./UserRules");

// member registration rules
exports.MRegistrationRules = [
  ...URegistrationRules,
  // Validation.date("date_of_birth"),
  Validation.text("address", 10, 150),
];

exports.MRegistrationRules = [
  ...URegistrationRules,
  // Validation.date("date_of_birth"),
  Validation.text("address", 10, 150),
  Validation.includes(
    "sub_role",
    MemberEnum.RESEARCHER.value,
    MemberEnum.PRESENTER.value,
    MemberEnum.ATTENDEE.value,
    MemberEnum.INNOVATOR.value
  ),
];

exports.MemberProfileUpdateRules = (req) => {
  const { date_of_birth, address } = req.body;

  // add user profile rules
  var rules = UserProfileUpdateRules(req);

  // add member profile rules
  if (date_of_birth) rules.push(Validation.date("date_of_birth"));
  if (address) rules.push(Validation.text("address", 10, 150));

  return rules;
};
