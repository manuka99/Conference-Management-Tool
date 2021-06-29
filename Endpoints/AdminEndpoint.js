const { sendSuccess } = require("../common/util");
const AdminDao = require("../Dao/AdminDao");
const lodash = require("lodash");
const { ValidateRequest } = require("../Middlewares/ValidateRequest");
const {
  ARegistrationRules,
  AdminProfileUpdateRules,
} = require("../Validation/AdminRules ");

/* Validations */
const ValidateAdminRegistration = async (req) => {
  await Promise.all(
    ARegistrationRules.map((validation) => validation.run(req))
  );
  ValidateRequest(req);
};

const ValidateAdminProfileUpdate = async (req) => {
  await Promise.all(
    AdminProfileUpdateRules(req).map((validation) => validation.run(req))
  );
  ValidateRequest(req);
};

// to register admin
exports.AdminRegistration = async (req, res, next) => {
  try {
    // validations
    await ValidateAdminRegistration(req);

    // register admin
    const user = await AdminDao.createNewAdmin(req.body);
    sendSuccess(res, { user, token: user.getSignedJwtToken() });
  } catch (error) {
    next(error);
  }
};

// to update admin
exports.UpdateAdminProfile = async (req, res, next) => {
  try {
    // validations
    await ValidateAdminProfileUpdate(req);

    // update admin
    const updatingAdminData = lodash.pick(req.body, [
      "firstName",
      "lastName",
      "phone",
      "email",
      "about",
    ]);
    const user = await AdminDao.updateAdmin(req.user._id, updatingAdminData);
    sendSuccess(res, { msg: "Profile was updated successfully.", user });
  } catch (error) {
    next(error);
  }
};
