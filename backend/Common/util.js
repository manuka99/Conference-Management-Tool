const sendSuccess = (res, data) => {
  res.status(200).json({ success: true, data });
};

const sendError = (res, data, errorCode = 400) => {
  res.status(errorCode).json({ success: false, data });
};

module.exports = {
  sendSuccess,
  sendError,
};
