const { sendError } = require("../common/util");

exports.RoleAuth = (roles) => (req, res, next) => {
  var hasRole = roles.includes(req.user.role);
  if (!hasRole) {
    sendError(
      res,
      {
        msg: "You are not authorized or permitted for this content!",
      },
      403
    );
    return false;
  } else if (hasRole && next) next();
  else return hasRole;
};
