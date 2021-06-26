const User = require("./User");

const { Schema } = require("mongoose");

const EditorSchema = new Schema({
  about: {
    type: String,
    required: false,
    minlength: [6, "Date of birth must have at least 6 characters."],
    maxlength: [500, "Date of birth must not have more than 15 characters."],
  },
});

const Editor = User.discriminator("editor", EditorSchema);
module.exports = Editor;
