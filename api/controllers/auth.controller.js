import bcryptjs from 'bcryptjs';
import { validateJsonSchema } from '../schema/jsonSchemaValidator.js';
import { signupSchema } from '../schema/signupSchema.js';
import { User } from '../models/user.model.js';

export const signup = async (request, response) => {
  const isValid = validateJsonSchema(signupSchema, request.body);
  if (!isValid) {
    response.status(400).json({ message: 'Request parameter schema validation failed!' });
  }

  const { username, email, password } = request.body;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    response.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
