const message = require('./messages');

const responseHandler = (req, res, next) => {
  res.ok = (data) => {
    message.successResponse(data, res);
  };
  res.failureResponse = (data) => {
    message.failureResponse(data, res);
  };
  res.inValidParam = (data) => {
    message.inValidParam(data, res);
  };
  res.insufficientParameters = () => {
    message.insufficientParameters(res);
  };
  res.isDuplicate = (data) => {
    message.isDuplicate(data, res);
  };
  res.loginSuccess = (data) => {
    message.loginSuccess(data, res);
  };
  res.loginFailed = (data) => {
    message.loginFailed(data, res);
  };
  res.unAuthorizedRequest = (data) => {
    message.unAuthorizedRequest(data, res);
  };
  res.validationError = (data) => {
    message.validationError(data, res);
  };
  res.recordNotFound = (data) => {
    message.recordNotFound(data, res);
  };
  next();
};

module.exports = responseHandler;
