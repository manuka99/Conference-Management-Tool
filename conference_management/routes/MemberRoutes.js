const MemberEndpoint = require("../Endpoints/MemberEndpoint");

exports.MemberRoutes = (app) => {
  app.get("/api/member/profile", MemberEndpoint.GetMemberProfile);
  app.patch("/api/member/profile", MemberEndpoint.UpdateMemberProfile);
};
