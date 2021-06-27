const mongoose = require("mongoose");
const { sendError, FormatValidationError } = require("../common/util");
const ValidationError = require("../Common/ValidationError");
const ApplicationError = require("../Common/ApplicationError");

exports.HandleError = (err, req, res, next) => {
  console.error(`Error Handler: ${err.message}`);
  if (err instanceof mongoose.Error) {
    sendError(res, err, 422);
  } else if (err instanceof ValidationError) {
    sendError(res, FormatValidationError(err), 422);
  } else if (err instanceof ApplicationError) {
    sendError(res, { msg: err.message, err }, 400);
  } else sendError(res, { msg: err.message, err }, 500);
};
