require("dotenv").config();

module.exports = {
  APP_URL: process.env.REACT_APP_BASE_URL,
  APP_USER_TOKEN: process.env.REACT_APP_USER_TOKEN,
  PAYHERE_MERCHANT: process.env.REACT_APP_PAYHERE_MERCHANT,
};
