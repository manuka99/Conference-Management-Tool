const User = require("./User");

const { Schema, Types } = require("mongoose");

const MemberSchema = new Schema({
  date_of_birth: {
    type: Date,
    required: [true, "Date of birth must not be empty."],
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
  payment: {
    type: String,
    required: false,
  },
  file: {
    type: Types.ObjectId,
    required: false,
    ref: "upload",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  approvalReason: {
    type: String,
    default: false,
  },
  approvedBy: {
    type: Types.ObjectId,
    required: false,
    ref: "user",
  },
});

const Member = User.discriminator("member", MemberSchema);
module.exports = Member;
