const Post = require("../Schemas/Post");

exports.savePost = async (data) => {
  const post = await Post.create(data);
  return post;
};

exports.updatePost = async (id, data) => {
  const post = await Post.findByIdAndUpdate(id, data);
  return post;
};

exports.findAll = async () => {
  const posts = await Post.find();
  return posts;
};

exports.findById = async (id) => {
  const post = await Post.find(id);
  return post;
};

exports.deleteById = async (id) => {
  const post = await Post.findByIdAndDelete(id);
  return post;
};
