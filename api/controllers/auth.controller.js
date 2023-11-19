import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model.js';
import { statusCodes } from '../utils/statusCodes.js';

export const signup = async (request, response, next) => {
  const { username, email, password } = request.body;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    response
      .status(statusCodes.CREATED)
      .json({ status: 'success', message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};
