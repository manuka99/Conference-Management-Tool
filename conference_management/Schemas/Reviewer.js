const User = require("./User");

const { Schema } = require("mongoose");

const ReviewerSchema = new Schema({
  about: {
    type: String,
    required: false,
    minlength: [6, "Date of birth must have at least 6 characters."],
    maxlength: [500, "Date of birth must not have more than 15 characters."],
  },
});

const Reviewer = User.discriminator("reviewer", ReviewerSchema);
module.exports = Reviewer;
