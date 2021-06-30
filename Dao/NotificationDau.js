const Notification = require("../Schemas/Notification");

exports.SaveNotification = async (data) => {
  var notification = await Notification.create(data);
  return notification;
};

exports.FindNotification = async (filter) => {
  var notifications = await Notification.find(filter).sort({
    updatedAt: "desc",
  });
  return notifications;
};
