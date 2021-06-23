import User from "./User";

const { Schema } = require("mongoose");

const MemberSchema = new Schema({
  date_Of_birth: {
    type: String,
    required: [true, "Date of birth must not be empty."],
    minlength: [6, "Date of birth must have at least 6 characters."],
    maxlength: [15, "Date of birth must not have more than 15 characters."],
  },

  address: {
    type: String,
    required: [true, "address must not be empty."],
    minlength: [8, "address must have at least 8 characters."],
    maxlength: [65, "address must not have more than 60 characters."],
  },

  sub_role: {
    type: String,
    required: false,
    enum: ["RESEARCHER", "PRESENTER", "ATTENDEE", "INNOVATOR"],
  },
});

const Member = User.discriminator("member", MemberSchema);
module.exports = Member;
