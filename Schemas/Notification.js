const { Schema, model, Types } = require("mongoose");

const NotificationSchema = new Schema(
  {
    from: {
      type: Types.ObjectId,
      default: "System Generated",
      ref: "user",
    },
    to: {
      type: Types.ObjectId,
      required: true,
      ref: "user",
    },
    message: {
      type: String,
      required: true,
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const Notification = model("notification", NotificationSchema);
module.exports = Notification;
