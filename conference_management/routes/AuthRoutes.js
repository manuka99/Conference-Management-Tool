const AuthEndpoint = require("../endpoints/AuthEndpoint");
const {
  LoginRules,
  URegistrationRules,
} = require("../Validation/AuthenticationRules");
const { MRegistrationRules } = require("../Validation/MemberRules");
const { ValidateRequest } = require("../Middlewares/ValidateRequest");
const { body } = require("express-validator");
const UserDao = require("../Dao/UserDao");

exports.AuthRoutes = (app) => {
  /* Public Routes */
  app.post(
    "/api/public/register",
    URegistrationRules,
    ValidateRequest,
    AuthEndpoint.Registration
  );
  app.post(
    "/api/public/login",
    LoginRules,
    ValidateRequest,
    AuthEndpoint.Login
  );
  app.post("/api/public/recover-password", AuthEndpoint.RecoverPassword);
  app.post(
    "/api/public/reset-password",
    ValidateRequest,
    AuthEndpoint.ResetPassword
  );

  /* Authenticated Routes */
  app.post("/api/auth/logout", AuthEndpoint.Logout);
  app.patch("/api/auth/security", ValidateRequest, AuthEndpoint.UpdatePassword);
};
