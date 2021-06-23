const User = require("../Schemas/User");

exports.createNewMember = async (data) => {
  var user = await User.create(data);
  return user;
};

exports.updateNewMember = async (id, data) => {
  var user = await User.findByIdAndUpdate(id, data);
  return user;
};
