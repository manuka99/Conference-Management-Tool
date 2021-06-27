const Upload = require("../Schemas/Upload");
const path = require("path");
const ApplicationError = require("../Common/ApplicationError");
const { v4 } = require("uuid");
const { PROJECT_DIR } = require("../settings");

exports.UploadFile = async (file, category = "temp", user = "public") => {
  var uploadDir = path.join(PROJECT_DIR, "uploads");

  category && path.join(uploadDir, category);
  user && path.join(uploadDir, user);

  const file_name = v4().toString().replace(/-/g, "");
  const file_ext = path.extname(file.name).toLowerCase();

  const file_path = path.join(uploadDir, file_name + file_ext);

  // save in system
  await file.mv(file_path);

  // save in DB
  const upload = await Upload.create({
    name: file_name,
    path: file_path,
    type: file.mimetype,
    size: file.size,
    category,
  });

  console.log(upload);
  return upload;
};
