const UserEndpoint = require("../endpoints/UserEndpoint");
const {
  LoginRules,
  ResetPasswordRules,
  UpdatePasswordRules,
} = require("../Validation/UserRules");
const { ValidateRequest } = require("../Middlewares/ValidateRequest");

exports.UserRoutes = (app) => {
  /* Public Routes */
  app.get("/api/public/validate-token", UserEndpoint.GetRequestUser);
  app.post("/api/public/register", UserEndpoint.Registration);
  app.post(
    "/api/public/login",
    LoginRules,
    ValidateRequest,
    UserEndpoint.Login
  );
  app.post("/api/public/recover-password", UserEndpoint.RecoverPassword);
  app.post(
    "/api/public/reset-password",
    ResetPasswordRules,
    ValidateRequest,
    UserEndpoint.ResetPassword
  );

  /* Authenticated Routes */
  app.patch("/api/auth/profile", UserEndpoint.UpdateUserProfile);
  app.get("/api/auth/profile", UserEndpoint.GetUserProfile);
  app.post("/api/auth/logout", UserEndpoint.Logout);
  app.patch(
    "/api/auth/security",
    UpdatePasswordRules,
    ValidateRequest,
    ValidateRequest,
    UserEndpoint.UpdatePassword
  );
};
