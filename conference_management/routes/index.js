const { sendError } = require("../common/util");
const { AuthRoutes } = require("./AuthRoutes");

exports.AppRoutes = (app) => {
  // Authentication Routes
  AuthRoutes(app);
  // Invalid Routes
  app.use("*", (req, res) => sendError(res, "Resource not found!"));
};
