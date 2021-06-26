const User = require("./User");

const { Schema } = require("mongoose");

const MemberSchema = new Schema({
  date_of_birth: {
    type: String,
    required: false,
  },

  address: {
    type: String,
    required: [true, "address must not be empty."],
    minlength: [8, "address must have at least 8 characters."],
    maxlength: [65, "address must not have more than 60 characters."],
  },

  sub_role: {
    type: String,
    required: true,
    enum: ["RESEARCHER", "PRESENTER", "ATTENDEE", "INNOVATOR"],
  },
});

const Member = User.discriminator("member", MemberSchema);
module.exports = Member;
