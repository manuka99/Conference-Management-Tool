var jwt = require("jsonwebtoken");
const User = require("../Schemas/User");
const JWTToken = require("../Schemas/JWTToken");
const { AUTH_SECRET } = require("../config/index");
var getIP = require("ipware")().get_ip;

// decode jwt token
exports.Authenticate = async (req, res, next) => {
  try {
    var token = String(req.header("authorization")).slice(7);

    // verify and decode token to get data
    var decodedToken = jwt.verify(token, AUTH_SECRET);

    // fetch user by decoded rtoken user id
    const user = await User.findById(decodedToken.data.user_id);

    // check if token was revoked, if so do not set auth user
    var jwtToken = await JWTToken.findOne({ token });
    if (jwtToken && !jwtToken.isValid) return next();

    // user is authenicated, used by other middlewares to verify role etc
    req.user = user;

    // save the user's token with user agent
    const useragent = req.useragent;

    // if no tokenin DB then create a new instance
    if (!jwtToken) jwtToken = new JWTToken();

    // update or create user agent
    jwtToken.user_id = user._id;
    jwtToken.token = token;
    jwtToken.ip_address = getIP(req).clientIp;
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
    jwtToken.save();

    next();
  } catch (error) {
    // return res.status(401).json({ message: "UnAuthenticated" });
    console.log(error);
    next();
  }
};
