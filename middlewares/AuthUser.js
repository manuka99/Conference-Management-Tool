exports.UserAuth = async (req, res, next) => {
  if (req.user && req.user._id.length > 0) return next();
  else return res.send(401, "Unauthorized");
};
