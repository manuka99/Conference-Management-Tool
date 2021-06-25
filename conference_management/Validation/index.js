const { check } = require("express-validator");
const { Types } = require("mongoose");
const UserDao = require("../Dao/UserDao");

exports.Validation = {
  email: () =>
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email address and Check again!"),

  unique_user_email: () =>
    this.Validation.email()
      .custom(ValidateUserEmail)
      .withMessage("Email address is associated with another profile!"),

  phone: () =>
    check("phone")
      .isMobilePhone("si-LK")
      .withMessage("Phone number is invalid or outside Sri Lanka"),

  password: () =>
    check("password")
      .isString()
      .not()
      .isEmpty()
      .withMessage("Password is required!")
      .isLength({ min: 6, max: 40 })
      .withMessage(
        "Password must be at least 6 chars long & not more than 40 chars long!"
      )
      .not()
      .isIn(["123", "password", "god", "abc"])
      .withMessage("Do not use a common word as the password")
      .matches(/\d/)
      .withMessage("Password must contain a number!"),

  confirm_password: () =>
    check("confirm_password")
      .custom(ValidateConfirmPassword)
      .withMessage("Password confirmation does not match password"),

  objectId: (key = "_id") =>
    check(key)
      .not()
      .isEmpty()
      .withMessage(`${key} cannot be empty`)
      .custom(ValidateObjectId)
      .withMessage(`${key} is not a valid mongoDb objectID`),

  text: (feild, min = 4, max = 1000) =>
    check(feild)
      .not()
      .isEmpty()
      .withMessage(`${feild} is required!`)
      .isString()
      .withMessage(`${feild} is not a valid string!`)
      .isLength({ min, max })
      .withMessage(`${feild} should be within ${min} - ${max} chars range!`),

  date: (feild) =>
    check(feild)
      .not()
      .isEmpty()
      .withMessage(`${feild} is required!`)
      .isDate()
      .withMessage(`${feild} is not a valid date!`),
};

const ValidateObjectId = (key) =>
  (Types.ObjectId.isValid(key) && Types.ObjectId(key).toHexString()) === key;

const ValidateUserEmail = async (email, { req }) => {
  return await UserDao.findUserByEmail(email)
    .then((user) => {
      if (
        (user && req.user && user._id.toString() === req.user._id.toString()) ||
        !user
      )
        return Promise.resolve();
      return Promise.reject();
    })
    .catch((err) => Promise.reject(err.message));
};

const ValidateConfirmPassword = (value, { req }) => value == req.body.password;
