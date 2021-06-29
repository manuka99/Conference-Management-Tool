const User = require("./User");

const { Schema } = require("mongoose");

const ReviewerSchema = new Schema({
  language_skill: {
    type: String,
    required: false,
    maxlength: [
      1000,
      "Language skill must not have more than 1000 characters.",
    ],
  },
});

const Reviewer = User.discriminator("reviewer", ReviewerSchema);
module.exports = Reviewer;
