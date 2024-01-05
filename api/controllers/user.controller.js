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
    await User.findByIdAndUpdate(
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

    response.status(statusCodes.OK).json({
      status: statusMessages.SUCCESS,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};
