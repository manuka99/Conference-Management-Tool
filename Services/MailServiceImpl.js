const { MAIL_USER, CLIENT_BASE } = require("../Config");
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

// send new registration email
exports.NewRegistrationEmail = async (user) => {
  var message = `Hi ${user.firstName + user.lastName}!,
  We're delighted to have you on board. If you have any questions regarding your account, please contact us at support@sliitcms.com Our technical support team will assist you with anything you need. Enjoy yourself, and welcome to SLIIT CMS 2021.`;

  var mailOptions = {
    from: MAIL_USER,
    to: user.email,
    subject: `SLIIT CMS - Registration`,
    text: message,
  };

  sendMail(mailOptions);
};

// send profile approved email
exports.ProfileApprovedEmail = async (user) => {
  var message = `Hi ${user.firstName + user.lastName}!, 
  This email is to confirm that we have approved your profile registration. We're delighted to have you on board. If you have any questions regarding your account, please contact us at support@sliitcms.com Our technical support team will assist you with anything you need. Enjoy yourself, and welcome to SLIIT CMS 2021.`;

  var mailOptions = {
    from: MAIL_USER,
    to: user.email,
    subject: `SLIIT CMS - Profile Approved`,
    text: message,
  };

  sendMail(mailOptions);
};

// send profile rejected email
exports.ProfileRejectedEmail = async (user) => {
  var message = `Hi ${user.firstName + user.lastName}!, 
  This email is to confirm that we have rejected your profile registration.
  The main reason is ${user.approvalReason}.
  If you have any questions regarding your account, please contact us at support@sliitcms.com Our technical support team will assist you with anything you need. Enjoy yourself, and welcome to SLIIT CMS 2021.`;

  var mailOptions = {
    from: MAIL_USER,
    to: user.email,
    subject: `SLIIT CMS - Profile Rejected`,
    text: message,
  };

  sendMail(mailOptions);
};
