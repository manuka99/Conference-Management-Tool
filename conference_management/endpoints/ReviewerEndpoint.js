const { sendSuccess } = require("../common/util");
const ReviewerDao = require("../Dao/ReviewerDao");
const lodash = require("lodash");
const {
  RRegistrationRules,
  ReviewerProfileUpdateRules,
} = require("../Validation/ReviewerRules ");
const { ValidateRequest } = require("../Middlewares/ValidateRequest");

/* Validations */
const ValidateReviewerRegistration = async (req) => {
  await Promise.all(
    RRegistrationRules.map((validation) => validation.run(req))
  );
  ValidateRequest(req);
};

const ValidateReviewerProfileUpdate = async (req) => {
  await Promise.all(
    ReviewerProfileUpdateRules(req).map((validation) => validation.run(req))
  );
  ValidateRequest(req);
};

// to register reviewer
exports.ReviewerRegistration = async (req, res, next) => {
  try {
    // validations
    await ValidateReviewerRegistration(req);

    // register reviewer
    const user = await ReviewerDao.createNewReviewer(req.body);
    sendSuccess(res, { user, token: user.getSignedJwtToken() });
  } catch (error) {
    next(error);
  }
};

// to update reviewer
exports.UpdateReviewerProfile = async (req, res, next) => {
  try {
    // validations
    await ValidateReviewerProfileUpdate(req);

    // update reviewer
    const updatingReviewerData = lodash.pick(req.body, [
      "firstName",
      "lastName",
      "phone",
      "email",
      "language_skill",
    ]);
    const user = await ReviewerDao.updateReviewer(
      req.user._id,
      updatingReviewerData
    );
    sendSuccess(res, { msg: "Profile was updated successfully.", user });
  } catch (error) {
    next(error);
  }
};
