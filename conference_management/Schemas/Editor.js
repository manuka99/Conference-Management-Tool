const User = require("./User");

const { Schema } = require("mongoose");

const EditorSchema = new Schema({
  writing_skill: {
    type: String,
    required: false,
    maxlength: [1000, "Writing skill must not have more than 1000 characters."],
  },
});

const Editor = User.discriminator("editor", EditorSchema);
module.exports = Editor;
