const User = require("../Schemas/User");

exports.findUserByEmailWithPassword = async (email) => {
  var user = await User.findOne({ email }).select("+password");
  return user;
};

exports.findUserByEmail = async (email) => {
  var user = await User.findOne({ email });
  return user;
};

exports.findUserByEmailWithPwdResetExpire = async (email) => {
  const user = await User.findOne({
    email,
    password_recovery_expire: { $gte: Date.now() },
  }).select("+password_recovery_token");
  return user;
};

exports.updatePassword = async (id, password) => {
  var user = await User.findById(id);
  user.password = password;
  user.password_recovery_token = undefined;
  user.password_recovery_expire = undefined;
  var updatedUser = await user.save();
  return updatedUser;
};

exports.updateUser = async (id, data) => {
  var user = await User.findByIdAndUpdate(id, data);
  return user;
};

exports.findUserById = async (id) => {
  var user = await User.findById(id);
  return user;
};

exports.findPopulatedUserById = async (id) => {
  var user = await User.findById(id).populate("file");
  return user;
};

exports.findUsersByRole = async (role) => {
  var users = await User.find({ role });
  return users;
};
