const User = require("../Schemas/User");

exports.ValidateRegisterCredentials = async (req, res) => {
  const subRoles = ["researcher", "presenter", "attendee", "inovator"];
  var errors = {};
  var { email, password, repeat_password, role, sub_role } = req.body;

  // validate req body
  const userEmail = await User.findOne({ email });

  if (userEmail && userEmail._id) {
    errors.email = {};
    errors.email.message =
      "There is a registered user with the email provided.";
  } else if (password != repeat_password) {
    errors.repeat_password = {};
    errors.repeat_password.message = "Passwords do not match!";
  } else if (role == "user" && !subRoles.includes(sub_role)) {
    errors.sub_role = {};
    errors.sub_role.message = "Select a valid user role.";
  }

  // handle req errors
  if (Object.keys(errors).length > 0) {
    res.status(422).json({
      errors,
      message: "Register validation failed",
    });
    return false;
  } else return true;
};
exports.ValidateLoginCredentials = (req, res) => {
  var errors = {};
  var { email, password } = req.body;
  // validate req body
  if (!email || email.length == 0) {
    errors.email = {};
    errors.email.message = "Enter a valid user email";
  } else if (!password || password.length == 0) {
    errors.password = {};
    errors.password.message = "Enter a valid password";
  }
  // handle req errors
  if (Object.keys(errors) > 0) {
    return res.status(422).json({
      errors,
      message: "Login validation failed",
    });
    return false;
  } else return true;
};

exports.ValidateResetCredentials = async (req, res) => {
  var errors = {};
  var { password, repeat_password } = req.body;

  if (password != repeat_password) {
    errors.repeat_password = {};
    errors.repeat_password.message = "Passwords do not match!";
  }

  // handle req errors
  if (Object.keys(errors).length > 0) {
    res.status(422).json({
      errors,
      message: "Reset password validation failed",
    });
    return false;
  } else return true;
};
