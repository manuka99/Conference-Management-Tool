const { check } = require("express-validator");
const { isBoolean } = require("lodash");
const { Types } = require("mongoose");
const UserDao = require("../Dao/UserDao");

exports.Validation = {
  email: () =>
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email address and Check again"),

  unique_user_email: () =>
    this.Validation.email()
      .custom(ValidateUserEmail)
      .withMessage("Email address is associated with another profile"),

  phone: () =>
    check("phone")
      .isMobilePhone("si-LK")
      .withMessage("Phone number is invalid or outside Sri Lanka"),

  password: () =>
    check("password")
      .isString()
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 40 })
      .withMessage(
        "Password must be at least 6 chars long & not more than 40 chars long!"
      )
      .not()
      .isIn(["123", "password", "god", "abc"])
      .withMessage("Do not use a common word as the password")
      .matches(/\d/)
      .withMessage("Password must contain a number"),

  confirm_password: () =>
    check("confirm_password")
      .custom(ValidateConfirmPassword)
      .withMessage("Password confirmation does not match password"),

  objectId: (key = "_id") =>
    check(key)
      .not()
      .isEmpty()
      .withMessage(`This feild cannot be empty`)
      .custom(ValidateObjectId)
      .withMessage(`This value is not a valid mongoDb objectID`),

  boolean: (key) =>
    check(key)
      .not()
      .isEmpty()
      .withMessage(`This feild cannot be empty`)
      .isBoolean()
      .withMessage(`This value is not a valid boolean`),

  includes: (key, ...enums) =>
    check(key)
      .not()
      .isEmpty()
      .withMessage(`This feild cannot be empty`)
      .isIn([...enums])
      .withMessage(`This value is not a valid type`),

  text: (feild, min = 4, max = 1000) =>
    check(feild)
      .not()
      .isEmpty()
      .withMessage(`This feild is required`)
      .isString()
      .withMessage(`This value is not a valid string`)
      .isLength({ min, max })
      .withMessage(`Value should be within ${min} - ${max} chars range`),

  date: (feild) =>
    check(feild)
      .not()
      .isEmpty()
      .withMessage(`This feild is required`)
      .isDate()
      .withMessage(`This value is not a valid date`),

  file: (feild = "file") =>
    check(feild)
      .custom(ValidateFile)
      .withMessage("Submission is required.")
      .custom(ValidateFileType)
      .withMessage("Submission must be in pdf format")
      .custom(ValidateFileSize)
      .withMessage("Submission size must be less than 25mb"),
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

const ValidateFile = (value, { req }) => {
  return req.files && req.files.file;
};

const ValidateFileType = (value, { req }) => {
  return (
    ValidateFile(value, { req }) &&
    req.files.file.mimetype === "application/pdf"
  );
};

const ValidateFileSize = (value, { req }) => {
  return ValidateFileType(value, { req }) && req.files.file.size < 26000000;
};
