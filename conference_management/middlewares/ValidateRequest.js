const { validationResult } = require("express-validator");
const ValidationError = require("../Common/ValidationError");
const _ = require("lodash");

exports.ValidateRequest = (req, res, next) => {
  const contexts = req["express-validator#contexts"];
  // const errors = _.flatMap(contexts, "errors");
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw new ValidationError("Validation failed", errors.array());
  // throw new ValidationError("Validation failed", contexts);
  next();
};

const data = {
  errors: [
    {
      fields: ["firstName"],
      locations: ["body", "cookies", "headers", "params", "query"],
      stack: [
        {
          negated: true,
          options: [null],
          message: "firstName is required!",
        },
        {
          negated: false,
          message: "firstName is not a valid string!",
        },
        {
          negated: false,
          options: [
            {
              min: 4,
              max: 20,
            },
          ],
          message: "firstName should be within 4 - 20 chars range!",
        },
      ],
      optional: false,
      _errors: [],
      dataMap: {},
    },
    {
      fields: ["email"],
      locations: ["body", "cookies", "headers", "params", "query"],
      stack: [
        {
          negated: true,
          options: [null],
          message: "Email is required!",
        },
        {
          negated: false,
          options: [null],
          message: "Invalid email address and Check again!",
        },
        {
          custom: false,
          options: [null],
        },
        {
          negated: false,
          message: "Email address is associated with another profile",
        },
      ],
      optional: false,
      _errors: [
        {
          value: "manukayasad@gmail.com",
          msg: "Email address is associated with another profile",
          param: "email",
          location: "body",
        },
      ],
      dataMap: {},
    },
    {
      fields: ["password"],
      locations: ["body", "cookies", "headers", "params", "query"],
      stack: [
        {
          negated: false,
        },
        {
          negated: true,
          options: [null],
          message: "Password is required!",
        },
        {
          negated: false,
          options: [
            {
              min: 6,
              max: 40,
            },
          ],
          message:
            "Password must be at least 6 chars long & not more than 40 chars long!",
        },
        {
          negated: true,
          options: [["123", "password", "god", "abc"]],
          message: "Do not use a common word as the password",
        },
        {
          negated: false,
          options: [{}, null],
          message: "Password must contain a number!",
        },
      ],
      optional: false,
      _errors: [],
      dataMap: {},
    },
    {
      fields: ["confirm_password"],
      locations: ["body", "cookies", "headers", "params", "query"],
      stack: [
        {
          negated: false,
          message: "Password confirmation does not match password",
        },
      ],
      optional: false,
      _errors: [],
      dataMap: {},
    },
  ],
};
