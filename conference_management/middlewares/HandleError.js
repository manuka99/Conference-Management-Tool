const mongoose = require("mongoose");
const { sendError } = require("../common/util");
const ValidationError = require("../Common/ValidationError");

exports.HandleError = (err, req, res, next) => {
  console.error(`Error Handler: ${err.message}`);
  if (err instanceof mongoose.Error) {
    sendError(res, err, 422);
  } else if (err instanceof ValidationError) {
    sendError(res, { errors: err.data, msg: err.message }, 422);
  } else sendError(res, err);
};
