const { sendError } = require("../Common/util");

exports.Authenticate = async (req, res, next) => {
  if (req.user && String(req.user._id).length > 0) return next();
  return sendError(
    res,
    { msg: "Please sign in to access protected content!" },
    401
  );
};
