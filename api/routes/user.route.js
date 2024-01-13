import express from 'express';
import { updateUser } from '../controllers/user.controller.js';
import { deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/helpers.js';
import { jsonSchemaValidatorMiddleware } from '../middlewares/jsonSchemaValidatorMiddleware.js';
import { updateUserSchema } from '../schemas/userSchema.js';

const userRouter = express.Router();

userRouter.post(
  '/update/:id',
  verifyToken,
  jsonSchemaValidatorMiddleware(updateUserSchema),
  updateUser
);

userRouter.delete('/delete/:id', verifyToken, deleteUser);

export default userRouter;
