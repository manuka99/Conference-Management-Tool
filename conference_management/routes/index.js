const { sendError } = require("../common/util");
const { AuthRoutes } = require("./AuthRoutes");
const { MemberRoutes } = require("./MemberRoutes");

exports.AppRoutes = (app) => {
  // Authentication Routes
  AuthRoutes(app);

  // Member Routes
  MemberRoutes(app);

  // Invalid Routes
  app.use("*", (req, res) => sendError(res, "Resource not found!"));
};
