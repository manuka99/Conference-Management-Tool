const { sendError, sendSuccess } = require("../common/util");
const MemberDao = require("../Dao/MemberDao");

// to register member
exports.MemberRegistration = async (req, res, next) => {
  MemberDao.createNewMember(req.body)
    .then((user) =>
      sendSuccess(res, { user, token: `Bearer ${user.getSignedJwtToken()}` })
    )
    .catch(next);
};
