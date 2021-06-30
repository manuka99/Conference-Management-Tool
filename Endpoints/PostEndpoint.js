const { sendSuccess } = require("../Common/util");
const PostDau = require("../Dao/PostDau");
const {
  NotifyPostsPublished,
  NotifyPostsApproval,
} = require("./NotificationEndpoint");

exports.GetAll = (req, res, next) => {
  PostDau.findAll()
    .then((posts) => sendSuccess(res, posts))
    .catch(next);
};

exports.GetAllPostsPanel = (req, res, next) => {
  PostDau.findAllAdmin()
    .then((posts) => sendSuccess(res, posts))
    .catch(next);
};

exports.DeletePost = (req, res, next) => {
  PostDau.deleteById(req.params.id)
    .then((posts) => sendSuccess(res, posts))
    .catch(next);
};

exports.NewPost = (req, res, next) => {
  const data = req.body;
  data.user = req.user._id;
  data.isApproved = false;
  PostDau.savePost(data)
    .then((post) => {
      sendSuccess(res, { post });
      NotifyPostsPublished(req.user, post);
    })
    .catch(next);
};

// only
exports.PostApproval = (req, res, next) => {
  const { isApproved } = req.body;
  const { id } = req.params;
  PostDau.updatePost(id, { isApproved })
    .then((post) => {
      sendSuccess(res, { post });
      NotifyPostsApproval(req.user, post);
    })
    .catch(next);
};
