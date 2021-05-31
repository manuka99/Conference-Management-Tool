const { sendSms } = require("./SmsService");

// send recovery password SMS
exports.PasswordRecoverySMS = async (user, recovery_token) => {
  var message = `   
     Click this link to reset password. http://localhost:3000/reset-password/${recovery_token}/${
    user.email
  }/${user.fname + user.lname}`;

  var smsOptions = {
    to: user.phone,
    body: message,
  };

  sendSms(smsOptions);
};
