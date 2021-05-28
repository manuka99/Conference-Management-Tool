const { MAIL_USER } = require("../config");
const { sendMail } = require("./MailService");

// send recovery password email
exports.PasswordRecoveryEmail = async (user) => {
  var message = `   
   <a href="http://localhost:3000/reset-password/${user.password_recovery_token}" clicktracking=off>
   Click this link to reset password.</a> `;

  var mailOptions = {
    from: MAIL_USER,
    to: user.email,
    subject: `Password recovery request`,
    text: message,
  };

  sendMail(mailOptions);
};
