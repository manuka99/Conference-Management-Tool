const SessionEndpoints = require("../Endpoints/SessionEndpoints");

exports.SessionRoutes = (app) => {
  app.get("/api/auth/sessions", SessionEndpoints.getUserSessions);
  app.get("/api/auth/sessions/:id", SessionEndpoints.getUserSession);
  app.post("/api/auth/sessions/revoke", SessionEndpoints.revokeAllUserSessions);
  app.post("/api/auth/sessions/revoke/:id", SessionEndpoints.revokeSession);
  app.delete("/api/auth/sessions/:id", SessionEndpoints.deleteSession);
};
