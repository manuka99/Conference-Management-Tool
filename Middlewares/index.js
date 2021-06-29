const { UserEnum } = require("../models/UserModel");
const { Authenticate } = require("./Authenticate");
const { GuestUser } = require("./GuestUser");
const { RoleAuth } = require("./RoleAuth");
const { TokenValidator } = require("./TokenValidator");

exports.AppMiddlewares = (app) => {
  /* VALIDATE TOKEN */
  app.all("*", TokenValidator);

  /* AUTHORIZATION */

  // authenticate all requests from,
  app.use(
    [
      "/api/auth/",
      "/api/admin/",
      "/api/editor/",
      "/api/reviewer/",
      "/api/member/",
    ],
    Authenticate
  );

  // required guest routes,
  app.use(["/api/public/login", "/api/public/register"], GuestUser);

  // ADMIN CONTENT
  app.use("/api/admin/", RoleAuth([UserEnum.ADMIN.value]));

  // EDITOR CONTENT
  app.use(
    "/api/editor/",
    RoleAuth([UserEnum.ADMIN.value, UserEnum.EDITOR.value])
  );

  // REVIEWER CONTENT
  app.use(
    "/api/reviewer/",
    RoleAuth([UserEnum.ADMIN.value, UserEnum.REVIEWER.value])
  );

  // MEMBER CONTENT
  app.use("/api/member/", RoleAuth([UserEnum.MEMBER.value]));
};
