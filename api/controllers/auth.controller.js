import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { User } from '../models/user.model.js';
import { statusCodes, statusMessages } from '../utils/status.js';
import { generateError } from '../utils/errors.js';
import { generateRandomPassword, generateRandomUsername } from '../utils/helpers.js';

export const signup = async (request, response, next) => {
  const { displayName, username, email, password } = request.body;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({ displayName, username, email, password: hashedPassword });

  try {
    await newUser.save();
    createNewUserResponse(response);
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
      return next(generateError(statusCodes.NOT_FOUNT, statusMessages.FAILED, 'User not found'));
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return next(
        generateError(statusCodes.UNAUTHORIZED, statusMessages.FAILED, 'Invalid user or password')
      );
    }

    createSignInResponse(user, response);
  } catch (error) {
    next(error);
  }
};

export const signInWithGoogle = async (request, response, next) => {
  const { name, email, avatar } = request.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      createSignInResponse(user, response);
      return;
    }

    const username = generateRandomUsername(name);
    const randomPassword = generateRandomPassword(12);
    const hashedPassword = await bcryptjs.hash(randomPassword, 10);
    const newUser = new User({
      displayName: name,
      username,
      email,
      password: hashedPassword,
      avatar
    });
    await newUser.save();
    createSignInResponse(newUser, response);
  } catch (error) {
    next(error);
  }
};

const createSignInResponse = (user, response) => {
  const tokenExpires = DateTime.local().plus({
    milliseconds: parseInt(process.env.JWT_EXPIRE)
  });

  const tokenDuration = parseInt(process.env.JWT_EXPIRE) / (1000 * 60);
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: tokenDuration
  });

  delete user._doc.password;

  response
    .cookie('access_token', token, {
      httpOnly: true,
      expires: tokenExpires.toJSDate()
    })
    .status(statusCodes.OK)
    .json({ status: statusMessages.SUCCESS, message: 'Sign in successful ', ...user._doc });
};

const createNewUserResponse = (response) => {
  response
    .status(statusCodes.CREATED)
    .json({ status: statusMessages.SUCCESS, message: 'User created successfully' });
};
