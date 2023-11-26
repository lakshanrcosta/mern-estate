import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';
import { jsonSchemaValidatorMiddleware } from '../middlewares/jsonSchemaValidatorMiddleware.js';
import { signUpSchema, signInSchema } from '../schemas/authSchemas.js';

const authRouter = express.Router();

authRouter.post('/signup', jsonSchemaValidatorMiddleware(signUpSchema), signup);

authRouter.post('/signin', jsonSchemaValidatorMiddleware(signInSchema), signin);

export default authRouter;
