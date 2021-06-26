const Member = require("../Schemas/Member");

exports.createNewMember = async (data) => {
  var member = await Member.create(data);
  member.password = null;
  return member;
};

exports.updateMember = async (id, data) => {
  var member = await Member.findByIdAndUpdate(id, data, {
    useFindAndModify: false,
  });
  return member;
};
