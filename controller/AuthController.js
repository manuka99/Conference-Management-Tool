const User = require("../models/User");
const { PasswordRecoveryEmail } = require("../services/MailServiceImpl");
const { PasswordRecoverySMS } = require("../services/SmsServiceImpl");
const bcrypt = require("bcrypt");
const {
  ValidateLoginCredentials,
  ValidateRegisterCredentials,
  ValidateResetCredentials,
} = require("../util/AuthValidator");
const JWTToken = require("../models/JWTToken");

// to register user
exports.Registration = async (req, res) => {
  try {
    if (!(await ValidateRegisterCredentials(req, res))) return;

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

    const newUser = await User.create({
      fname,
      lname,
      date_Of_birth,
      address,
      phone,
      email,
      password,
      sub_role,
    });

    const user = await newUser.save();

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
  if (!(await ValidateLoginCredentials(req, res))) return;

  const { email, password } = req.body;

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
  user.password = null;
  return res.status(200).json({
    user,
    message: "Success user login",
    token: `Bearer ${user.getSignedJwtToken()}`,
  });
};

exports.Logout = async (req, res) => {
  try {
    var token = String(req.header("authorization")).slice(7);
    const jwtToken = await JWTToken.findOne({ token });
    if (!jwtToken) jwtToken = new JWTToken({ token });

    // revoke token
    jwtToken.isValid = false;
    jwtToken.save();

    return res.status(200).json({ message: "Token revoked successfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.RecoverPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .json({ message: "No account associated with the email provided." });

  //gnerate password recovery token
  const recovery_token = user.getPasswordRecoveryToken();

  //save password recovery token
  await user.save();

  //send password recovery mail
  PasswordRecoveryEmail(user, recovery_token);

  //send password recovery SMS
  PasswordRecoverySMS(user, recovery_token);

  return res
    .status(200)
    .json({ message: "Password reset link has been sent succesfully" });
};

exports.ResetPassword = async (req, res) => {
  // validate req
  if (!(await ValidateResetCredentials(req, res))) return;

  const user = await User.findOne({
    email: req.body.email,
    password_recovery_expire: { $gte: Date.now() },
  });

  if (!user)
    return res.status(400).json({
      message: "Password recovery link has been expired or not available.",
    });

  // compare the token in url and hashed version in the DB
  const isMatch = await bcrypt.compare(
    req.body.token,
    user.password_recovery_token
  );

  if (!isMatch)
    return res.status(400).json({
      message: "Password recovery link has been expired or not available.",
    });

  user.password = req.body.password;
  user.password_recovery_token = undefined;
  user.password_recovery_expire = undefined;

  try {
    await user.save();
  } catch (error) {
    return res.status(422).json(error);
  }

  user.password = null;

  res.status(200).json({
    user,
    message: "Password was reset successfully!",
    token: `Bearer ${user.getSignedJwtToken()}`,
  });
};
