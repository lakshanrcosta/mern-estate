import Ajv from 'ajv';
import { statusCodes } from '../utils/statusCodes.js';

const ajv = new Ajv();

export const jsonSchemaValidatorMiddleware = (schema) => {
  return (request, response, next) => {
    const isValid = ajv.validate(schema, request.body);

    if (!isValid) {
      return response
        .status(statusCodes.BAD_REQUEST)
        .json({ error: 'Invalid request body', errors: ajv.errors });
    }

    next();
  };
};
