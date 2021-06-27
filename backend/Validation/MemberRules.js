const { Validation } = require(".");
const { MemberEnum } = require("../models/UserModel");
const { URegistrationRules, UserProfileUpdateRules } = require("./UserRules");

// member registration rules
exports.MRegistrationRules = (data) => {
  const { sub_role } = data;
  const validations = [
    ...URegistrationRules,
    Validation.date("date_of_birth"),
    Validation.text("address", 10, 150),
    Validation.includes(
      "sub_role",
      MemberEnum.RESEARCHER.value,
      MemberEnum.PRESENTER.value,
      MemberEnum.ATTENDEE.value,
      MemberEnum.INNOVATOR.value
    ),
  ];

  if (sub_role) {
    switch (sub_role) {
      case MemberEnum.INNOVATOR.value:
        validations.push(Validation.file());
        validations.push(Validation.text("payment"));
        break;

      default:
        break;
    }
  }

  return validations;
};

exports.MemberProfileUpdateRules = (req) => {
  const { date_of_birth, address, sub_role } = req.body;
  const { files } = req;

  // add user profile rules
  var rules = UserProfileUpdateRules(req);

  // add member profile rules
  if (date_of_birth) rules.push(Validation.date("date_of_birth"));
  if (address) rules.push(Validation.text("address", 10, 150));
  if (sub_role && files && files.file) {
    switch (sub_role) {
      case MemberEnum.INNOVATOR.value:
        rules.push(Validation.file());
        rules.push(Validation.text("payment"));
        break;

      default:
        break;
    }
  }
  return rules;
};
