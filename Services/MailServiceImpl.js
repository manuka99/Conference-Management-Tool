const { MAIL_USER, CLIENT_BASE } = require("../config");
const { sendMail } = require("./MailService");

// send recovery password email
exports.PasswordRecoveryEmail = async (user, recovery_token) => {
  var message = `   
   <a href="${CLIENT_BASE}/public/auth/reset-password/${recovery_token}/${
    user.email
  }/${user.firstName + user.lastName}" clicktracking=off>
   Click this link to reset password.</a> `;

  var mailOptions = {
    from: MAIL_USER,
    to: user.email,
    subject: `Password recovery request`,
    html: message,
  };

  sendMail(mailOptions);
};
