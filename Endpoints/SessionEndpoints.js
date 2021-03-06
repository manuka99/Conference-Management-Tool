const { sendSuccess } = require("../Common/util");
const JWTTokenDao = require("../Dao/JWTTokenDao");
const geoip = require("geoip-lite");

exports.getUserSessions = async (req, res, next) => {
  try {
    const sessions = await JWTTokenDao.findAllByUserID(req.user._id);
    const current = await JWTTokenDao.findByToken(req.user_jwt);
    return sendSuccess(res, { sessions, current });
  } catch (error) {
    next(error);
  }
};

exports.getUserSession = async (req, res, next) => {
  try {
    const session = await JWTTokenDao.findById(req.params.id);
    const current = await JWTTokenDao.findByToken(req.user_jwt);
    const geo_data = geoip.lookup(session.ip_address);
    return sendSuccess(res, { session, current, geo_data });
  } catch (error) {
    next(error);
  }
};

exports.revokeAllUserSessions = (req, res, next) => {
  JWTTokenDao.invalidateTokensOfUser(req.user._id)
    .then((jwtTokens) => sendSuccess(res, jwtTokens))
    .catch(next);
};

exports.revokeSession = (req, res, next) => {
  JWTTokenDao.invalidateTokenById(req.params.id)
    .then((jwtToken) => sendSuccess(res, jwtToken))
    .catch(next);
};

exports.deleteSession = (req, res, next) => {
  JWTTokenDao.deleteById(req.params.id)
    .then((jwtToken) => sendSuccess(res, jwtToken))
    .catch(next);
};
