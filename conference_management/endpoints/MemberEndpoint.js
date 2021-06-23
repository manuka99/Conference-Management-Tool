const { sendError, sendSuccess } = require("../common/util");
const MemberDao = require("../dau/MemberDao");

// to register member
exports.MemberRegistration = async (req, res, next) => {
  MemberDao.createNewMember(req.body)
    .then((data) => sendSuccess(res, data))
    .catch(next);
};
