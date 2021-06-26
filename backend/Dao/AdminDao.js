const Admin = require("../Schemas/Admin");

exports.createNewAdmin = async (data) => {
  var admin = await Admin.create(data);
  admin.password = null;
  return admin;
};

exports.updateAdmin = async (id, data) => {
  var admin = await Admin.findByIdAndUpdate(id, data, {
    useFindAndModify: false,
  });
  return admin;
};
