const Notification = require("../Schemas/Notification");

exports.SaveNotification = async (data) => {
  var notification = await Notification.create(data);
  return notification;
};
