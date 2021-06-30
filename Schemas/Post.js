const { Schema, model, Types } = require("mongoose");

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  user: {
    type: Types.ObjectId,
    required: true,
    ref: "user",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

const Post = model("post", PostSchema);
module.exports = Post;
