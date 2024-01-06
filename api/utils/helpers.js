import GeneratePassword from 'generate-password';
import jwt from 'jsonwebtoken';
import { generateError } from '../utils/errors.js';
import { statusCodes, statusMessages } from '../utils/status.js';

export const generateRandomPassword = (length, numbers = true, uppercase = true) => {
  return GeneratePassword.generate({
    length,
    numbers,
    uppercase
  });
};

export const generateRandomUsername = (givenNames) => {
  const names = givenNames.split(' ').join('').toLowerCase();
  const randomNumber = Math.floor(Math.random() * 90) + 10;
  return `${names}${randomNumber}`;
};

export const verifyToken = (request, response, next) => {
  const token = request.cookies.access_token;

  if (!token) {
    return next(generateError(statusCodes.UNAUTHORIZED, statusMessages.FAILED, 'Unauthorized'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return next(
        generateError(statusCodes.FORBIDDEN, statusMessages.FAILED, 'Token is not valid')
      );
    }

    request.user = user;
    next();
  });
};
