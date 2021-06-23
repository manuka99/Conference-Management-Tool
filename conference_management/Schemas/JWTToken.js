const { Schema, model } = require("mongoose");

const TokenSchema = new Schema(
  {
    user_id: String,
    token: String,
    ip_address: String,
    user_agent: String,
    deviceType: String,
    deviceInfo: String,
    osInfo: String,
    browser: String,
    version: String,
    payload: String,
    last_activity: Number,
    isValid: Boolean,
  },

  { timestamps: true }
);

const JWTToken = model("token", TokenSchema);
module.exports = JWTToken;
