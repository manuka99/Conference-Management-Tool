exports.AuthUser = async (req, res, next) => {
  if (req.user && String(req.user._id).length > 0) return next();
  else return res.status(401).json({ message: "UnAuthorized" });
};
