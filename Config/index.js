require("dotenv").config();

var PORT = process.env.LOCAL_PORT;
var DB = process.env.LOCAL_DB;
var CLIENT_BASE = process.env.LOCAL_CLIENT_BASE;

if (process.env.NODE_ENV && process.env.NODE_ENV.trim() == "production") {
  PORT = process.env.PORT;
  DB = process.env.ATLAS_DB;
  CLIENT_BASE = process.env.HEROKU_CLIENT_BASE;
}

module.exports = {
  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH_EXPIRE: process.env.AUTH_EXPIRE,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  PAYHERE_MERCHANT: process.env.PAYHERE_MERCHANT,
  DB,
  PORT,
  CLIENT_BASE,
};
