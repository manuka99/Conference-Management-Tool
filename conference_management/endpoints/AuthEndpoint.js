const { PasswordRecoveryEmail } = require("../services/MailServiceImpl");
const { PasswordRecoverySMS } = require("../services/SmsServiceImpl");
const { sendError, sendSuccess } = require("../common/util");
const UserEnum = require("../models/UserModel");
const MemberEndpoint = require("./MemberEndpoint");
const UserDao = require("../Dao/UserDao");
const JWTTokenDao = require("../Dao/JWTTokenDao");

/* VALIDATION RULES */

// to register user
exports.Registration = async (req, res, next) => {
  const { role } = req.body;
  switch (role) {
    case UserEnum.MEMBER.value:
      MemberEndpoint.MemberRegistration(req, res, next);
      break;

    default:
      sendError(res, { message: "Invalid Role assigned " });
      break;
  }
};

// to login
exports.Login = async (req, res, next) => {
  const { email, password } = req.body;

  // match email
  UserDao.findUserByEmailWithPassword(email)
    .then((user) => {
      if (!user)
        return sendError(res, {
          message: "No account associated with the email provided.",
        });

      // match password
      const isMatch = user.matchPasswords(password);
      if (!isMatch)
        return sendError(res, {
          message: "Password is incorrect",
        });

      // return jwt token
      user.password = null;

      return sendSuccess(res, {
        user,
        message: "Success user login",
        token: user.getSignedJwtToken(),
      });
    })
    .catch(next);
};

exports.Logout = async (req, res, next) => {
  var token = String(req.header("authorization")).slice(7);
  await JWTTokenDao.invalidateToken(token)
    .then((data) => sendSuccess(res, { message: "Token revoked successfully" }))
    .catch(next);
};

exports.RecoverPassword = async (req, res, next) => {
  const { email } = req.body;
  UserDao.findUserByEmail(email)
    .then((user) => {
      if (!user)
        return sendError(res, {
          message: "No account associated with the email provided.",
        });

      //gnerate and save password recovery token
      const recovery_token = user.getPasswordRecoveryToken();

      //send password recovery mail
      PasswordRecoveryEmail(user, recovery_token);

      //send password recovery SMS
      PasswordRecoverySMS(user, recovery_token);

      return sendSuccess(res, {
        message: "Password reset link has been sent succesfully",
      });
    })
    .catch(next);
};

exports.ResetPassword = async (req, res, next) => {
  const { email, token, password, repeat_password, logOutAllDevices } =
    req.body;

  if (repeat_password !== password)
    return sendError(res, {
      message: "Passwords do not match.",
    });

  UserDao.findUserByEmailWithPwdResetExpire(email)
    .then(async (user) => {
      if (!user)
        return sendError(res, {
          message: "Password recovery link has been expired or not available.",
        });

      // compare the token in url and hashed version in the DB
      const isMatch = user.matchPasswordRecoveryTokens(token);

      if (!isMatch)
        return sendError(res, {
          message: "Password recovery link has been expired or not available.",
        });

      // update password
      UserDao.updatePassword(user._id, password)
        .then((updatedUser) => {
          // revoke other logged in tokens if user requested
          if (logOutAllDevices) JWTTokenDao.invalidateTokensOfUser(user._id);
          return sendSuccess(res, {
            updatedUser,
            message: "Password was reset successfully!",
            token: updatedUser.getSignedJwtToken(),
          });
        })
        .catch(next);
    })
    .catch(next);
};

exports.UpdatePassword = async (req, res, next) => {
  const { password, repeat_password, logOutAllDevices } = req.body;
  const { user } = req;

  if (repeat_password !== password)
    return sendError(res, {
      message: "Passwords do not match.",
    });

  // update password
  UserDao.updatePassword(user._id, password)
    .then((updatedUser) => {
      // revoke other logged in tokens if user requested
      if (logOutAllDevices) JWTTokenDao.invalidateTokensOfUser(user._id);
      return sendSuccess(res, {
        message: "Password was updated successfully!",
        token: updatedUser.getSignedJwtToken(),
      });
    })
    .catch(next);
};
