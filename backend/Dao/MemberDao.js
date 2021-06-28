const Member = require("../Schemas/Member");

exports.createNewMember = async (data) => {
  var member = await Member.create(data);
  member.password = null;
  return member;
};

exports.updateMember = async (id, data) => {
  var member = await Member.findByIdAndUpdate(id, data);
  return member;
};

exports.deleteMember = async (_id) => {
  var member = await Member.findOneAndDelete({ _id });
  return member;
};

exports.findMembersBySubRole = async (sub_role) => {
  var members = await Member.find({ sub_role });
  return members;
};
