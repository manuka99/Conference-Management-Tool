const Users = require("../models/Users");
const { PasswordRecoveryEmail } = require("../services/MailServiceImpl");
const { PasswordRecoverySMS } = require("../services/SmsServiceImpl");
const { ValidateLoginCredentials } = require("../util/AuthValidator");

// to register user
exports.Registration = async (req, res) => {
  try {
    // destructure
    const {
      fname,
      lname,
      date_Of_birth,
      address,
      phone,
      email,
      password,
      sub_role,
    } = req.body;

    const user = await Users.create({
      fname,
      lname,
      date_Of_birth,
      address,
      phone,
      email,
      password,
      sub_role,
    });

    await user.save();

    return res.status(200).json({
      user,
      message: "User has been registered successfully.",
      token: `Bearer ${user.getSignedJwtToken()}`,
    });
  } catch (error) {
    return res.status(422).json(error);
  }
};

// to login
exports.Login = async (req, res) => {
  // validate req
  const { email, password } = ValidateLoginCredentials(req, res);

  // match email
  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return res.status(400).json({
      message: "No account associated with the email provided.",
    });

  // match password
  const isMatch = await user.matchPasswords(password);
  if (!isMatch)
    return res.status(400).json({
      message: "Password is incorrect",
    });

  // return jwt token
  return res.status(200).json({
    user,
    message: "Success user login",
    token: `Bearer ${user.getSignedJwtToken()}`,
  });
};

exports.RecoverPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .json({ message: "No account associated with the email provided." });

  //gnerate password recovery token
  const resetToken = user.getPasswordRecoveryToken();

  //save password recovery token
  await user.save();

  //send password recovery mail
  PasswordRecoveryEmail(user);

  //send password recovery SMS
  PasswordRecoverySMS(user);
};

exports.ResetPassword = async (req, res) => {
  // compare the token in url and hashed version
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    password_recovery_token,
    password_recovery_expire: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({
      message: "Password recovery link has been expired or not available.",
    });

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(201).json({
    user,
    message: "Password was reset successfully!",
    token: user.getSignedJwtToken(),
  });
};
