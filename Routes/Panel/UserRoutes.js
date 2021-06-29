const UserEndpoint = require("../../endpoints/UserEndpoint");
const MemberEndpoint = require("../../endpoints/MemberEndpoint");
const { ProtectedRegistration } = require("../../Validation/UserRules");
const { ValidateRequest } = require("../../Middlewares/ValidateRequest");

exports.PanelUserRoutes = (app) => {
  /* Reviewer Routes */
  app.get("/api/reviewer/user-role/:role_name", UserEndpoint.GetUsersFromRole);
  app.get("/api/reviewer/users/:id", UserEndpoint.GetUserData);
  app.post(
    "/api/reviewer/users",
    ProtectedRegistration,
    ValidateRequest,
    UserEndpoint.Registration
  );
  app.patch("/api/reviewer/approve/user/:id", MemberEndpoint.MemberApproval);

  /* Admin Routes */
  app.delete("/api/admin/users/:id", MemberEndpoint.DeleteMember);
};
