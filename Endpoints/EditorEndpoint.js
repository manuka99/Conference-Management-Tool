const { sendSuccess } = require("../Common/util");
const EditorDao = require("../Dao/EditorDao");
const lodash = require("lodash");
const { ValidateRequest } = require("../Middlewares/ValidateRequest");
const {
  ERegistrationRules,
  EditorProfileUpdateRules,
} = require("../Validation/EditorRules ");
const { NotifyProfileRegistered } = require("./NotificationEndpoint");

/* Validations */
const ValidateEditorRegistration = async (req) => {
  await Promise.all(
    ERegistrationRules.map((validation) => validation.run(req))
  );
  ValidateRequest(req);
};

const ValidateEditorProfileUpdate = async (req) => {
  await Promise.all(
    EditorProfileUpdateRules(req).map((validation) => validation.run(req))
  );
  ValidateRequest(req);
};

// to register editor
exports.EditorRegistration = async (req, res, next) => {
  try {
    // validations
    await ValidateEditorRegistration(req);

    // register editor
    const user = await EditorDao.createNewEditor(req.body);

    // notification
    NotifyProfileRegistered(user);

    sendSuccess(res, { user, token: user.getSignedJwtToken() });
  } catch (error) {
    next(error);
  }
};

// to update editor
exports.UpdateEditorProfile = async (req, res, next) => {
  try {
    // validations
    await ValidateEditorProfileUpdate(req);

    // update Editor
    const updatingEditorData = lodash.pick(req.body, [
      "firstName",
      "lastName",
      "phone",
      "email",
      "writing_skill",
    ]);
    const user = await EditorDao.updateEditor(req.user._id, updatingEditorData);
    sendSuccess(res, { msg: "Profile was updated successfully.", user });
  } catch (error) {
    next(error);
  }
};
