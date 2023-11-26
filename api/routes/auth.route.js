import express from 'express';
import { signup, signin, signInWithGoogle } from '../controllers/auth.controller.js';
import { jsonSchemaValidatorMiddleware } from '../middlewares/jsonSchemaValidatorMiddleware.js';
import { signUpSchema, signInSchema, signInWithGoogleSchema } from '../schemas/authSchemas.js';

const authRouter = express.Router();

authRouter.post('/signup', jsonSchemaValidatorMiddleware(signUpSchema), signup);

authRouter.post('/signin', jsonSchemaValidatorMiddleware(signInSchema), signin);

authRouter.post('/google', jsonSchemaValidatorMiddleware(signInWithGoogleSchema), signInWithGoogle);

export default authRouter;
