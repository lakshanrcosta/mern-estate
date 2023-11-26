import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DateTime, Duration } from 'luxon';
import { User } from '../models/user.model.js';
import { statusCodes } from '../utils/statusCodes.js';
import { generateError } from '../utils/errors.js';

export const signup = async (request, response, next) => {
  const { displayName, username, email, password } = request.body;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({ displayName, username, email, password: hashedPassword });

  try {
    await newUser.save();
    response
      .status(statusCodes.CREATED)
      .json({ status: 'success', message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const signin = async (request, response, next) => {
  const { usernameOrEmail, password } = request.body;
  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });

    if (!user) {
      return next(generateError(404, 'failed', 'User not found'));
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);

    if (!isPasswordMatch) {
      return next(generateError(401, 'failed', 'Invalid user or password'));
    }

    const tokenExpires = DateTime.local().plus({
      milliseconds: parseInt(process.env.JWT_EXPIRE)
    });

    const tokenDuration = parseInt(process.env.JWT_EXPIRE) / (1000 * 60);
    console.log(tokenDuration);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: tokenDuration
    });

    delete user._doc.password;

    response
      .cookie('access_token', token, {
        httpOnly: true,
        expires: tokenExpires.toJSDate()
      })
      .status(200)
      .json({ user });
  } catch (error) {
    next(error);
  }
};
