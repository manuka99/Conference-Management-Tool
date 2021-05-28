const { sendSms } = require("./SmsService");

// send recovery password SMS
exports.PasswordRecoverySMS = async (user) => {
  var message = `   
     Click this link to reset password. http://localhost:3000/reset-password/${user.password_recovery_token} `;

  var smsOptions = {
    to: user.phone,
    body: message,
  };

  sendSms(smsOptions);
};
