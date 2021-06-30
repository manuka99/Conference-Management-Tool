const { sendSuccess } = require("../Common/util");
const {
  SaveNotification,
  FindNotification,
} = require("../Dao/NotificationDau");
const { findUsersByRole } = require("../Dao/UserDao");
const { UserEnum } = require("../Models/UserModel");

exports.NotifyProfileRegistered = async (user) => {
  try {
    const message = `New user with role ${user.role} and email ${user.email} has been registered!`;
    const from = user._id;
    const url = `/protected/users/${user._id}`;
    var notifications = [];

    const admins = await findUsersByRole(UserEnum.ADMIN.value);
    for (let index = 0; index < admins.length; index++) {
      const admin = admins[index];
      notifications.push({ message, url, from, to: admin._id });
    }

    SaveNotification(notifications);
  } catch (error) {
    console.log(error.message);
  }
};

exports.NotifyProfileApprovals = async (req_user, member, status) => {
  try {
    const message = `User with role ${req_user.role} and email ${req_user.email} has set approval status to ${status} of the user with email ${member.email} and user id ${member._id} `;
    const from = req_user._id;
    const url = `/protected/users/${member._id}`;
    var notifications = [];

    const notifyUsers = await findUsersByRole(
      UserEnum.ADMIN.value,
      UserEnum.EDITOR.value,
      UserEnum.REVIEWER.value
    );

    for (let index = 0; index < notifyUsers.length; index++) {
      const notifyUser = notifyUsers[index];
      notifications.push({ message, from, url, to: notifyUser._id });
    }

    SaveNotification(notifications);
  } catch (error) {
    console.log(error.message);
  }
};

exports.NotifyPostsPublished = async (req_user, post) => {
  try {
    const message = `User with role ${req_user.role} and email ${req_user.email} has published a new post.`;
    const from = req_user._id;
    const url = `/protected/posts/${post._id}`;
    var notifications = [];

    const notifyUsers = await findUsersByRole(UserEnum.ADMIN.value);
    for (let index = 0; index < notifyUsers.length; index++) {
      const notifyUser = notifyUsers[index];
      notifications.push({ message, from, url, to: notifyUser._id });
    }

    SaveNotification(notifications);
  } catch (error) {
    console.log(error.message);
  }
};

exports.NotifyPostsApproval = async (req_user, post) => {
  try {
    const message = `User with role ${req_user.role} and email ${req_user.email} has set the status of the post id ${post._id} to ${post.isApproved}.`;
    const from = req_user._id;
    const url = `/protected/posts/${post._id}`;
    var notifications = [];

    const notifyUsers = await findUsersByRole(UserEnum.ADMIN.value);
    for (let index = 0; index < notifyUsers.length; index++) {
      const notifyUser = notifyUsers[index];
      notifications.push({ message, from, url, to: notifyUser._id });
    }

    SaveNotification(notifications);
  } catch (error) {
    console.log(error.message);
  }
};

exports.GetUserNotifications = async (req, res, next) => {
  FindNotification({ to: req.user._id })
    .then((notifications) => sendSuccess(res, notifications))
    .catch(next);
};
