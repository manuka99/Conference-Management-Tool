const JWTToken = require("../Schemas/JWTToken");

exports.findByToken = async (token) => {
  const jwtToken = await JWTToken.findOne({ token });
  return jwtToken;
};

exports.invalidateToken = async (token) => {
  const jwtTokens = await JWTToken.updateMany(
    { token },
    { $set: { isValid: false } }
  );
  return jwtTokens;
};

exports.invalidateTokenById = async (_id) => {
  const jwtToken = await JWTToken.updateOne(
    { _id },
    { $set: { isValid: false } }
  );
  return jwtToken;
};

exports.invalidateTokensOfUser = async (user_id) => {
  const jwtTokens = await JWTToken.updateMany(
    { user_id: user_id },
    { $set: { isValid: false } }
  );
  return jwtTokens;
};

exports.saveTokenWithUseragent = async (token, user, useragent, ip) => {
  var jwtToken = await JWTToken.findOne({ token });

  // if no tokenin DB then create a new instance
  if (!jwtToken) jwtToken = new JWTToken();
  // update or create user agent
  jwtToken.user_id = user._id;
  jwtToken.token = token;
  jwtToken.ip_address = ip;
  jwtToken.user_agent = useragent.source;
  jwtToken.deviceType = useragent.isDesktop
    ? "desktop"
    : useragent.isBot
    ? "bot"
    : "mobile";
  jwtToken.deviceInfo = useragent.platform;
  jwtToken.osInfo = useragent.os;
  jwtToken.browser = useragent.browser;
  jwtToken.version = useragent.version;
  jwtToken.payload = useragent.platform;
  jwtToken.last_activity = Math.floor(Date.now() / 1000);
  jwtToken.isValid = true;
  await jwtToken.save();
};

exports.findAllByUserID = async (user_id) => {
  const tokens = await JWTToken.find({ user_id }).sort({ updatedAt: "desc" });
  return tokens;
};

exports.findById = async (id) => {
  const token = await JWTToken.findById(id);
  return token;
};

exports.deleteById = async (id) => {
  const token = await JWTToken.findByIdAndDelete(id);
  return token;
};
