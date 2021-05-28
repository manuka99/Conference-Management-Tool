exports.ValidateLoginCredentials = (req, res) => {
  var message = "";
  var credentials = req.body;
  // validate req body
  if (!credentials) message = "Invalid login credentials";
  else if (!credentials.email || credentials.email.length == 0)
    message = "Enter a valid user email";
  else if (!credentials.password || credentials.password.length == 0)
    message = "Enter a valid password";
  // handle req errors
  if (message.length > 0)
    return res.status(422).json({
      message,
    });
  else return credentials;
};
