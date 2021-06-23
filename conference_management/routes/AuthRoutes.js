const AuthEndpoint = require("../endpoints/AuthEndpoint");
const { AuthUser } = require("../middlewares/AuthUser");

exports.AuthRoutes = (app) => {
  /* Public Routes */

  app.post("/api/public/register", AuthEndpoint.Registration);
  app.post("/api/public/login", AuthEndpoint.Login);
  app.post("/api/public/recover-password", AuthEndpoint.RecoverPassword);
  app.post("/api/public/reset-password", AuthEndpoint.ResetPassword);

  /* Authenticated Routes */

  app.post("/api/auth/logout", AuthUser, AuthEndpoint.Logout);
};
