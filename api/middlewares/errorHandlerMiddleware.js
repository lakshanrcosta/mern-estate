import { statusCodes } from '../utils/statusCodes';

export const errorHandlerMiddleware = (error, request, response, next) => {
  const statusCode = error.statusCode || statusCodes.INTERNAL_SERVER_ERROR;
  const status = error.status || 'failed';
  const errorMessage = error.message || 'Internal server error';
  response.status(statusCode).json({
    error: {
      status,
      message: errorMessage
    }
  });
};
