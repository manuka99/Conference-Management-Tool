const { sendError } = require("../common/util");

exports.RoleAuth = (roles) => (req, res, next) => {
  roles.includes(req.user.role)
    ? next()
    : sendError(
        res,
        {
          msg: "You are not authorized or permitted for this content!",
        },
        403
      );
};
