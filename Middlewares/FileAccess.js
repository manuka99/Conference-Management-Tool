const { sendError } = require("../Common/util");
const { FindFileByName } = require("../Dao/UploadDau");
const { UserEnum } = require("../Models/UserModel");

// file can be viewed by its author or admin or reviewer
exports.FileAccess = (req, res, next) => {
  const { name } = req.params;
  try {
    const upload = FindFileByName(name);
    if (upload.user !== "public") {
      if (
        req.user &&
        (req.user._id.toString() === upload.user ||
          [UserEnum.ADMIN.value, UserEnum.REVIEWER.value].includes(
            req.user.role
          ))
      )
        return next();
      return sendError(
        res,
        {
          msg: "You are not authorized to view this file!",
        },
        403
      );
    }
    return next();
  } catch (e) {
    return next(e);
  }
};
