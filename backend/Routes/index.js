const { sendError } = require("../common/util");
const { UserRoutes } = require("./UserRoutes");
const { MemberRoutes } = require("./MemberRoutes");
const { SessionRoutes } = require("./SessionRoutes");

exports.AppRoutes = (app) => {
  // Authentication Routes
  UserRoutes(app);

  // Member Routes
  MemberRoutes(app);

  // Session Routes
  SessionRoutes(app);

  // Invalid Routes
  app.use("*", (req, res) => sendError(res, "Resource not found!"));
};
