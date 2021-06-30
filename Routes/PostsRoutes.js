const PostEndpoint = require("../Endpoints/PostEndpoint");
const { ValidateRequest } = require("../Middlewares/ValidateRequest");
const PostRules = require("../Validation/PostRules");

exports.PostsRoutes = (app) => {
  /* PUBLIC */
  app.get("/api/public/posts", PostEndpoint.GetAll);
  /* EDITOR */
  app.post(
    "/api/editor/posts",
    PostRules.NewPostRules,
    ValidateRequest,
    PostEndpoint.NewPost
  );
  /* ADMIN */
  app.patch(
    "/api/admin/posts/approve/:id",
    PostRules.PostApprovalRules,
    ValidateRequest,
    PostEndpoint.PostApproval
  );
};
