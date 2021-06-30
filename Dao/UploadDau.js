const Upload = require("../Schemas/Upload");
const path = require("path");
const ApplicationError = require("../Common/ApplicationError");
const { v4 } = require("uuid");
const { PROJECT_DIR } = require("../settings");
var fs = require("fs");

exports.UploadFile = async (file, category = "temp", user = "public") => {
  var uploadDir = path.join(PROJECT_DIR, "uploads");

  if (uploadDir) {
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
  }

  if (category) {
    uploadDir = path.join(uploadDir, category);
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
  }

  if (user.toString()) {
    uploadDir = path.join(uploadDir, user.toString());
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
  }

  const file_name = v4().toString().replace(/-/g, "");
  const file_ext = path.extname(file.name).toLowerCase();

  const file_path = path.join(uploadDir, file_name + file_ext);

  // save in system
  await file.mv(file_path);

  // save in DB
  const upload = await Upload.create({
    submit_name: file.name,
    name: file_name,
    path: file_path,
    user,
    type: file.mimetype,
    size: file.size,
    category,
  });

  return upload;
};

exports.FindFileByName = async (name) => {
  const upload = await Upload.findOne({ name });
  return upload;
};
