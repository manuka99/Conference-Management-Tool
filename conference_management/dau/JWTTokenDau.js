const JWTToken = require("../Schemas/JWTToken");

exports.getToken = async (token) => {
  const jwtToken = await JWTToken.findOne({ token });
  return jwtToken;
};

exports.invalidateToken = async (token) => {
  const jwtToken = await JWTToken.findOne({ token });
  if (!jwtToken) jwtToken = new JWTToken({ token });
  jwtToken.isValid = false;
  await jwtToken.save();
  return jwtToken;
};
