const { sendSms } = require("./SmsService");
const { CLIENT_BASE } = require("../Config");

// send recovery password SMS
exports.PasswordRecoverySMS = async (user, recovery_token) => {
  var message = `   
     Click this link to reset password. ${CLIENT_BASE}/public/auth/reset-password/${recovery_token}/${
    user.email
  }/${user.firstName + user.lastName}`;

  var smsOptions = {
    to: user.phone,
    body: message,
  };

  sendSms(smsOptions);
};
