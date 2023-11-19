export const generateError = (statusCode, status, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.status = status;
  error.message = message;
  return error;
};
