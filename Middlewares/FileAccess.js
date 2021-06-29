const { sendError } = require("../Common/util");
const { FindFileByName } = require("../Dao/UploadDau");
const { UserEnum } = require("../Models/UserModel");

// file can be viewed by its author or admin or reviewer
exports.FileAccess = (req, res, next) => {
  const { name } = req.params;
  FindFileByName(name)
    .then((upload) => {
      if (upload.user !== "public") {
        if (
          req.user &&
          (req.user._id.toString() === upload.user ||
            req.user.role === UserEnum.ADMIN.value ||
            req.user.role === UserEnum.REVIEWER.value)
        )
          return next();
        return sendError(res, {
          msg: "You are not authorized to view this file!",
        });
      }
      return next();
    })
    .catch(next);
};
