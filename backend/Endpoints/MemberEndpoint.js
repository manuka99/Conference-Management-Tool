const { sendSuccess } = require("../common/util");
const MemberDao = require("../Dao/MemberDao");
const lodash = require("lodash");
const {
  MRegistrationRules,
  MemberProfileUpdateRules,
} = require("../Validation/MemberRules");
const { ValidateRequest } = require("../Middlewares/ValidateRequest");
const UploadDau = require("../Dao/UploadDau");

/* Validations */
const ValidateMemberRegistration = async (req) => {
  await Promise.all(
    MRegistrationRules(req.body).map((validation) => validation.run(req))
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

    const memberData = req.body;

    // register member
    var user = await MemberDao.createNewMember(memberData);

    // upload file if present
    if (req.files && req.files.file) {
      const upload = await UploadDau.UploadFile(
        req.files.file,
        "innovations",
        user._id
      );
      // update user
      user = await MemberDao.updateMember(user._id, { file: upload._id });
    }

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
      "payment",
    ]);

    // upload file if present
    if (req.files && req.files.file) {
      const upload = await UploadDau.UploadFile(
        req.files.file,
        "innovations",
        req.user._id
      );
      updatingMemberData.file = upload._id;
    }

    const user = await MemberDao.updateMember(req.user._id, updatingMemberData);
    sendSuccess(res, { msg: "Profile was updated successfully.", user });
  } catch (error) {
    next(error);
  }
};
