exports.MemberRoutes = (app) => {
  app.get("/api/member/profile", (req, res) => res.status(200).json(req.user));
};
