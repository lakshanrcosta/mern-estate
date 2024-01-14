import express from 'express';
import { updateUser, deleteUser, updatePassword, signOut } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/helpers.js';
import { jsonSchemaValidatorMiddleware } from '../middlewares/jsonSchemaValidatorMiddleware.js';
import { updateUserSchema, updatePasswordSchema } from '../schemas/userSchema.js';

const userRouter = express.Router();

userRouter.post(
  '/update/:id',
  verifyToken,
  jsonSchemaValidatorMiddleware(updateUserSchema),
  updateUser
);

userRouter.delete('/delete/:id', verifyToken, deleteUser);

userRouter.patch(
  '/update-password/:id',
  verifyToken,
  jsonSchemaValidatorMiddleware(updatePasswordSchema),
  updatePassword
);

userRouter.get('/signout', verifyToken, signOut);

export default userRouter;
