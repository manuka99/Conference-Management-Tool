const { sendError, sendSuccess } = require("../common/util");
const MemberDao = require("../Dao/MemberDao");
const lodash = require("lodash");

// to register member
exports.MemberRegistration = async (req, res, next) => {
  MemberDao.createNewMember(req.body)
    .then((user) => sendSuccess(res, { user, token: user.getSignedJwtToken() }))
    .catch(next);
};

// to view profile
exports.GetMemberProfile = async (req, res, next) => {
  MemberDao.findMember(req.user._id)
    .then((user) => sendSuccess(res, { user }))
    .catch(next);
};

// to update profile
exports.UpdateMemberProfile = async (req, res, next) => {
  const { _id } = req.user;

  const data = lodash.pick(req.body, [
    "firstName",
    "lastName",
    "phone",
    "email",
    "date_Of_birth",
    "address",
  ]);

  MemberDao.updateMember(_id, data)
    .then((user) =>
      sendSuccess(res, { message: "Profile was updated successfully.", user })
    )
    .catch(next);
};
