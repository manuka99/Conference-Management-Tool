const { Schema, model } = require("mongoose");

const TokenSchema = new Schema(
  {
    user_id: String,
    ip_address: String,
    user_agent: String,
    deviceType: String,
    deviceInfo: String,
    osInfo: String,
    brand: String,
    model: String,
    payload: String,
    last_activity: Number,
    isValid: Boolean,
  },

  { timestamps: true }
);

module.exports = model("token", TokenSchema);
