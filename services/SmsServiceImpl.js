const { sendSms } = require("./SmsService");

// send recovery password SMS
exports.PasswordRecoverySMS = async (user, recovery_token) => {
  var message = `   
     Click this link to reset password. http://localhost:3000/password-reset?token=${recovery_token}&email=${user.email}`;

  var smsOptions = {
    to: user.phone,
    body: message,
  };

  sendSms(smsOptions);
};
