const { sendSuccess } = require("../common/util");
const MemberDao = require("../Dao/MemberDao");
const lodash = require("lodash");
const {
  MRegistrationRules,
  MemberProfileUpdateRules,
} = require("../Validation/MemberRules");
const { ValidateRequest } = require("../Middlewares/ValidateRequest");

/* Validations */
const ValidateMemberRegistration = async (req) => {
  await Promise.all(
    MRegistrationRules.map((validation) => validation.run(req))
  );
  ValidateRequest(req);
};

const ValidateMemberProfileUpdate = async (req) => {
  await Promise.all(
    MemberProfileUpdateRules(req).map((validation) => validation.run(req))
  );
  ValidateRequest(req);
};

// to register member
exports.MemberRegistration = async (req, res, next) => {
  try {
    // validations
    await ValidateMemberRegistration(req);

    // register member
    const user = await MemberDao.createNewMember(req.body);
    sendSuccess(res, { user, token: user.getSignedJwtToken() });
  } catch (error) {
    next(error);
  }
};

// to update member
exports.UpdateMemberProfile = async (req, res, next) => {
  try {
    // validations
    await ValidateMemberProfileUpdate(req);

    // update member
    const updatingMemberData = lodash.pick(req.body, [
      "firstName",
      "lastName",
      "phone",
      "email",
      "date_Of_birth",
      "address",
    ]);
    const user = await MemberDao.updateMember(req.user._id, updatingMemberData);
    sendSuccess(res, { msg: "Profile was updated successfully.", user });
  } catch (error) {
    next(error);
  }
};
