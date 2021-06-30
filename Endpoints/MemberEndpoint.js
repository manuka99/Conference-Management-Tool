const { sendSuccess } = require("../Common/util");
const MemberDao = require("../Dao/MemberDao");
const lodash = require("lodash");
const {
  MRegistrationRules,
  MemberProfileUpdateRules,
} = require("../Validation/MemberRules");
const { ValidateRequest } = require("../Middlewares/ValidateRequest");
const UploadDau = require("../Dao/UploadDau");
const { RoleAuth } = require("../Middlewares/RoleAuth");
const { UserEnum } = require("../Models/UserModel");
const {
  NotifyProfileRegistered,
  NotifyProfileApprovals,
} = require("./NotificationEndpoint");
const {
  NewRegistrationEmail,
  ProfileApprovedEmail,
  ProfileRejectedEmail,
} = require("../Services/MailServiceImpl");

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

    const memberData = lodash.pick(req.body, [
      "firstName",
      "lastName",
      "phone",
      "email",
      "date_of_birth",
      "address",
      "payment",
      "password",
      "sub_role",
    ]);

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
    // send app notification
    NotifyProfileRegistered(user);
    // send email
    NewRegistrationEmail(user);
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
      "date_of_birth",
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

// Roles of Admin and Reviewer
exports.MemberApproval = (req, res, next) => {
  // validate roles
  var validator = RoleAuth([UserEnum.ADMIN.value, UserEnum.REVIEWER.value]);
  if (!validator(req, res)) return -1;

  // update
  const { id } = req.params;
  const { isApproved, approvalReason } = req.body;

  MemberDao.updateMember(id, {
    isApproved,
    approvalReason,
    approvedBy: req.user._id,
  })
    .then((user) => {
      // app notification
      NotifyProfileApprovals(req.user, user, isApproved);
      // email
      isApproved ? ProfileApprovedEmail(user) : ProfileRejectedEmail(user);
      sendSuccess(res, { user });
    })
    .catch(next);
};

// Roles of Admin
exports.DeleteMember = (req, res, next) => {
  // validate roles
  var validator = RoleAuth([UserEnum.ADMIN.value]);
  if (!validator(req, res)) return -1;
  // delete
  const { id } = req.params;
  MemberDao.deleteMember(id)
    .then((user) => sendSuccess(res, { user }))
    .catch(next);
};
