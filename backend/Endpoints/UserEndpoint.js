const { PasswordRecoveryEmail } = require("../services/MailServiceImpl");
const { PasswordRecoverySMS } = require("../services/SmsServiceImpl");
const { sendError, sendSuccess } = require("../common/util");
const { UserEnum, MemberEnum } = require("../models/UserModel");
const AdminEndpoint = require("./AdminEndpoint");
const EditorEndpoint = require("./EditorEndpoint");
const ReviewerEndpoint = require("./ReviewerEndpoint");
const MemberEndpoint = require("./MemberEndpoint");
const UserDao = require("../Dao/UserDao");
const JWTTokenDao = require("../Dao/JWTTokenDao");
const ValidationError = require("../Common/ValidationError");
const { RoleAuth } = require("../Middlewares/RoleAuth");
const MemberDao = require("../Dao/MemberDao");

//to validate token
exports.GetRequestUser = (req, res, next) => {
  return sendSuccess(res, { user: req.user });
};

// to register user
exports.Registration = (req, res, next) => {
  const { role } = req.body;
  switch (role) {
    case UserEnum.ADMIN.value:
      AdminEndpoint.AdminRegistration(req, res, next);
      break;
    case UserEnum.EDITOR.value:
      EditorEndpoint.EditorRegistration(req, res, next);
      break;
    case UserEnum.REVIEWER.value:
      ReviewerEndpoint.ReviewerRegistration(req, res, next);
      break;
    case UserEnum.MEMBER.value:
      MemberEndpoint.MemberRegistration(req, res, next);
      break;
    default:
      throw new ValidationError("Invalid Role assigned!");
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
          msg: "No account associated with the email provided.",
        });

      // match password
      const isMatch = user.matchPasswords(password);
      if (!isMatch)
        return sendError(res, {
          msg: "Password is incorrect",
        });

      // return jwt token
      user.password = null;

      return sendSuccess(res, {
        user,
        msg: "Success user login",
        token: user.getSignedJwtToken(),
      });
    })
    .catch(next);
};

// to view profile
exports.GetUserProfile = (req, res, next) => {
  UserDao.findUserById(req.user._id)
    .then((user) => sendSuccess(res, { user }))
    .catch(next);
};

// to register user
exports.UpdateUserProfile = (req, res, next) => {
  UserDao.findUserById(req.user._id)
    .then((user) => {
      switch (user.role) {
        case UserEnum.ADMIN.value:
          AdminEndpoint.UpdateAdminProfile(req, res, next);
          break;
        case UserEnum.EDITOR.value:
          EditorEndpoint.UpdateEditorProfile(req, res, next);
          break;
        case UserEnum.REVIEWER.value:
          ReviewerEndpoint.UpdateReviewerProfile(req, res, next);
          break;
        case UserEnum.MEMBER.value:
          MemberEndpoint.UpdateMemberProfile(req, res, next);
          break;
        default:
          throw new ValidationError("Invalid Role assigned!");
      }
    })
    .catch(next);
};

exports.Logout = (req, res, next) => {
  var token = String(req.header("authorization")).slice(7);
  JWTTokenDao.invalidateToken(token)
    .then((data) => sendSuccess(res, { msg: "Token revoked successfully!" }))
    .catch(next);
};

exports.RecoverPassword = (req, res, next) => {
  const { email } = req.body;
  UserDao.findUserByEmail(email)
    .then((user) => {
      if (!user)
        return sendError(res, {
          msg: "No account associated with the email provided!",
        });

      //gnerate and save password recovery token
      const recovery_token = user.getPasswordRecoveryToken();

      //send password recovery mail
      PasswordRecoveryEmail(user, recovery_token);

      //send password recovery SMS
      PasswordRecoverySMS(user, recovery_token);

      return sendSuccess(res, {
        msg: "Password reset link has been sent succesfully",
      });
    })
    .catch(next);
};

exports.ResetPassword = (req, res, next) => {
  const { email, token, password, logOutAllDevices } = req.body;

  UserDao.findUserByEmailWithPwdResetExpire(email)
    .then((user) => {
      if (!user)
        throw new ValidationError(
          "Password recovery link has been expired or not available."
        );

      // compare the token in url and hashed version in the DB
      const isMatch = user.matchPasswordRecoveryTokens(token);

      if (!isMatch)
        throw new ValidationError(
          "Password recovery link has been expired or not available."
        );

      // update password
      UserDao.updatePassword(user._id, password)
        .then((updatedUser) => {
          // revoke other logged in tokens if user requested
          if (logOutAllDevices) JWTTokenDao.invalidateTokensOfUser(user._id);
          return sendSuccess(res, {
            user: updatedUser,
            msg: "Password was reset successfully!",
            token: updatedUser.getSignedJwtToken(),
          });
        })
        .catch(next);
    })
    .catch(next);
};

exports.UpdatePassword = async (req, res, next) => {
  const { password, logOutAllDevices } = req.body;
  const { user } = req;

  // update password
  UserDao.updatePassword(user._id, password)
    .then((updatedUser) => {
      // revoke other logged in tokens if user requested
      if (logOutAllDevices) JWTTokenDao.invalidateTokensOfUser(user._id);
      return sendSuccess(res, {
        msg: "Password was updated successfully!",
        token: updatedUser.getSignedJwtToken(),
      });
    })
    .catch(next);
};

// Roles of Admin and Reviewer
exports.GetUsersFromRole = (req, res, next) => {
  // validate roles
  var validator = RoleAuth([UserEnum.ADMIN.value, UserEnum.REVIEWER.value]);
  if (!validator(req, res)) return -1;

  // get role
  const { role_name } = req.params;
  // capitalize role
  const role_uc = role_name.toString().toUpperCase();
  // get users
  if (
    role_uc === UserEnum.ADMIN.value ||
    role_uc === UserEnum.EDITOR.value ||
    role_uc === UserEnum.REVIEWER.value
  ) {
    UserDao.findUsersByRole(role_uc)
      .then((users) => sendSuccess(res, users))
      .catch(next);
  } else if (
    role_uc === MemberEnum.RESEARCHER.value ||
    role_uc === MemberEnum.PRESENTER.value ||
    role_uc === MemberEnum.ATTENDEE.value ||
    role_uc === MemberEnum.INNOVATOR.value
  ) {
    MemberDao.findMembersBySubRole(role_uc)
      .then((users) => sendSuccess(res, users))
      .catch(next);
  } else throw new ValidationError("Invalid Role assigned!");
};

// Roles of Admin and Reviewer
exports.GetUserData = (req, res, next) => {
  // validate roles
  var validator = RoleAuth([UserEnum.ADMIN.value, UserEnum.REVIEWER.value]);
  if (!validator(req, res)) return -1;

  const { id } = req.params;
  UserDao.findPopulatedUserById(id)
    .then((user) => sendSuccess(res, { user }))
    .catch(next);
};
