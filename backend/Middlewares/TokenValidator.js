var jwt = require("jsonwebtoken");
const UserDao = require("../Dao/UserDao");
const JWTTokenDao = require("../Dao/JWTTokenDao");
const { AUTH_SECRET } = require("../config/index");
var getIP = require("ipware")().get_ip;
const consola = require("consola");

// decode jwt token (if present) then if the jwt token is valid request will be authenticated
exports.TokenValidator = async (req, res, next) => {
  try {
    // access token in request
    var token = String(req.header("authorization")).slice(7);

    // verify and decode token to get data
    const decodedToken = jwt.verify(token, AUTH_SECRET);

    // fetch user by decoded rtoken user id
    const user = await UserDao.findUserById(decodedToken.data.user_id);

    // check if token was revoked, if so do not set auth user
    const jwtToken = await JWTTokenDao.findByToken(token);

    // check if jwtToken is revoked
    if (jwtToken && !jwtToken.isValid)
      throw new Error("Using a revoked authorization token");

    // user is authenicated, used by other middlewares to verify role etc
    req.user = user;

    // save the user's token with user agent
    JWTTokenDao.saveTokenWithUseragent(
      token,
      user,
      req.useragent,
      getIP(req).clientIp
    );
  } catch (error) {
    consola.error(`TokenValidator Middleware: ${error.message}`);
  } finally {
    next();
  }
};
