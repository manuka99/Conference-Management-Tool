require("dotenv").config();

module.exports = {
  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH_EXPIRE: process.env.AUTH_EXPIRE,
  LOCAL_DB: process.env.LOCAL_DB,
  ATLAS_DB: process.env.ATLAS_DB,
  APP_PORT: process.env.APP_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  PAYHERE_MERCHANT: process.env.PAYHERE_MERCHANT,
  CLIENT_BASE: process.env.CLIENT_BASE,
};
