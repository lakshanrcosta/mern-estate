import bcryptjs from 'bcryptjs';
import { generateError } from '../utils/errors.js';
import { statusCodes, statusMessages } from '../utils/status.js';
import { User } from '../models/user.model.js';

export const updateUser = async (request, response, next) => {
  const userId = request.user.id;
  if (userId !== request.params.id) {
    return next(
      generateError(
        statusCodes.FORBIDDEN,
        statusMessages.FAILED,
        "Cannot update other user's details"
      )
    );
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          displayName: request.body.displayName,
          username: request.body.username,
          email: request.body.email,
          avatar: request.body.avatar
        }
      },
      { new: true }
    );
    delete updatedUser._doc.password;
    response.status(statusCodes.OK).json(updatedUser._doc);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (request, response, next) => {
  const userId = request.user.id;
  if (userId !== request.params.id) {
    return next(
      generateError(
        statusCodes.FORBIDDEN,
        statusMessages.FAILED,
        "Cannot cannot delete other user's accounts"
      )
    );
  }

  try {
    await User.findByIdAndDelete(request.params.id);
    response.clearCookie('access_token');
    response
      .status(statusCodes.OK)
      .json({ status: statusMessages.SUCCESS, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (request, response, next) => {
  const userId = request.user.id;
  if (userId !== request.params.id) {
    return next(
      generateError(
        statusCodes.FORBIDDEN,
        statusMessages.FAILED,
        "Cannot cannot change other user's password"
      )
    );
  }

  try {
    // Validate current password
    const user = await User.findById(userId);
    const currentPassword = request.body.currentPassword;
    const newPassword = request.body.newPassword;
    const confirmPassword = request.body.confirmPassword;

    const isPasswordMatch = await bcryptjs.compare(currentPassword, user._doc.password);
    if (!isPasswordMatch) {
      return next(
        generateError(
          statusCodes.UNAUTHORIZED,
          statusMessages.FAILED,
          'Your current password is invalid'
        )
      );
    }

    // Validate new password match
    const isNewPasswordMatch = newPassword === confirmPassword;
    if (!isNewPasswordMatch) {
      return next(
        generateError(
          statusCodes.UNAUTHORIZED,
          statusMessages.FAILED,
          'Your new password did not match with confirm password'
        )
      );
    }

    // update password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, {
      $set: {
        password: hashedPassword
      }
    });
    response
      .status(statusCodes.OK)
      .json({ status: statusMessages.SUCCESS, message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};
