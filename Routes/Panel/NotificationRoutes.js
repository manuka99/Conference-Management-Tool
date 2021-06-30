const {
  GetUserNotifications,
} = require("../../Endpoints/NotificationEndpoint");

exports.NotificationRoutes = (app) => {
  app.get("/api/auth/notifications", GetUserNotifications);
};
