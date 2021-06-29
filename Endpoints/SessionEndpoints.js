const { sendSuccess } = require("../Common/util");
const JWTTokenDao = require("../Dao/JWTTokenDao");

exports.getUserSessions = async (req, res, next) => {
  JWTTokenDao.findAllByUserID(req.user._id)
    .then((jwtTokens) => sendSuccess(res, jwtTokens))
    .catch(next);
};

exports.getUserSession = async (req, res, next) => {
  JWTTokenDao.findById(req.params.id)
    .then((jwtToken) => sendSuccess(res, jwtToken))
    .catch(next);
};

exports.revokeAllUserSessions = async (req, res, next) => {
  JWTTokenDao.invalidateTokensOfUser(req.user._id)
    .then((jwtTokens) => sendSuccess(res, jwtTokens))
    .catch(next);
};

exports.revokeSession = async (req, res, next) => {
  JWTTokenDao.invalidateTokenById(req.params.id)
    .then((jwtToken) => sendSuccess(res, jwtToken))
    .catch(next);
};

exports.deleteSession = async (req, res, next) => {
  JWTTokenDao.deleteById(req.params.id)
    .then((jwtToken) => sendSuccess(res, jwtToken))
    .catch(next);
};
