require("dotenv").config();

module.exports = {
  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH_EXPIRE: process.env.AUTH_EXPIRE,
  DB: process.env.APP_DB,
  PORT: process.env.APP_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
};
