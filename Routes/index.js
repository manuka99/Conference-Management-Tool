const { sendError } = require("../common/util");
const { UserRoutes } = require("./UserRoutes");
const { PanelUserRoutes } = require("./Panel/UserRoutes");
const { MemberRoutes } = require("./MemberRoutes");
const { SessionRoutes } = require("./SessionRoutes");
const UploadEndpoint = require("../Endpoints/UploadEndpoint");

exports.AppRoutes = (app) => {
  // Authentication Routes
  UserRoutes(app);

  // Member Routes
  MemberRoutes(app);

  // Session Routes
  SessionRoutes(app);

  /* Panel Routes */
  PanelUserRoutes(app);

  app.get("/api/public/files/:name", UploadEndpoint.GetFile);

  // Invalid Routes
  // app.use("*", (req, res) => sendError(res, "Resource not found!"));
};
