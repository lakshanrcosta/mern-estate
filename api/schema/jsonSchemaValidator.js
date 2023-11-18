import Ajv from 'ajv';

export const validateJsonSchema = (schema, requestBody) => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  return validate(requestBody);
};
