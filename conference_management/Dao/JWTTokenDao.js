const JWTToken = require("../Schemas/JWTToken");

exports.findByToken = async (token) => {
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
