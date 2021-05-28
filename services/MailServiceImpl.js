const { MAIL_USER } = require("../config");
const { sendMail } = require("./MailService");

// send recovery password email
exports.PasswordRecoveryEmail = async (user, recovery_token) => {
  var message = `   
   <a href="http://localhost:3000/password-reset?token=${recovery_token}&email=${user.email}" clicktracking=off>
   Click this link to reset password.</a> `;

  var mailOptions = {
    from: MAIL_USER,
    to: user.email,
    subject: `Password recovery request`,
    html: message,
  };

  sendMail(mailOptions);
};
