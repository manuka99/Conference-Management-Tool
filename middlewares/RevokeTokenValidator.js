const JWTToken = require("../models/JWTToken");

exports.RevokeTokenValidator = async (req, res, next) => {
  if (req.user) {
    const token = req.header("authorization");
    const jwtToken = await JWTToken.findOne({ token });
    if (!jwtToken.isValid)
      return res.status(401).json({ message: UnAuthenticated });
  }
  next();
};
