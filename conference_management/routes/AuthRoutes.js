const AuthEndpoint = require("../endpoints/AuthEndpoint");

exports.AuthRoutes = (app) => {
  /* Public Routes */

  app.post("/api/public/register", AuthEndpoint.Registration);
  app.post("/api/public/login", AuthEndpoint.Login);
  app.post("/api/public/recover-password", AuthEndpoint.RecoverPassword);
  app.post("/api/public/reset-password", AuthEndpoint.ResetPassword);

  /* Authenticated Routes */
  app.post("/api/auth/logout", AuthEndpoint.Logout);

  // test
  app.get("/api/auth/", (req, res) => res.status(200).json({ user: req.user }));
};
