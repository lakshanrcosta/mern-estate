import { statusCodes, statusMessages } from '../utils/status.js';

export const errorHandlerMiddleware = (error, request, response, next) => {
  const statusCode = error.statusCode || statusCodes.INTERNAL_SERVER_ERROR;
  const status = error.status || statusMessages.FAILED;
  const errorMessage = error.message || 'Internal server error';
  response.status(statusCode).json({
    status,
    message: errorMessage
  });
};
