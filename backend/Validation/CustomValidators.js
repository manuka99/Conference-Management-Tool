const expressValidator = require("express-validator");
const UserDao = require("../Dao/UserDao");

exports.CustomValidators = () => {
  return expressValidator({
    customValidators: {
      isEmailAvailable,
    },
  });
};

const isEmailAvailable = (email) => {
  return new Promise((resolve, reject) => {
    UserDao.findUserByEmail(email)
      .then((user) => user._id !== req.user._id)
      .catch((err) => false);
    console.log("data", data);

    UserDao.findOne({ username: username }, (err, user) => {
      if (err) throw err;
      if (user == null) {
        resolve();
      } else {
        reject();
      }
    });
  });
};
