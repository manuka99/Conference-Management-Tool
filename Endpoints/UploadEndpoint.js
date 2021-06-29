const { sendSuccess } = require("../Common/util");
const UploadDau = require("../Dao/UploadDau");

exports.GetFile = (req, res, next) => {
  const { name } = req.params;
  UploadDau.FindFileByName(name)
    .then((upload) => res.sendFile(upload.path))
    .catch(next);
};
