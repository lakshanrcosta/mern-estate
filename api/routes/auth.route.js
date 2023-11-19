import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { jsonSchemaValidatorMiddleware } from '../middlewares/jsonSchemaValidatorMiddleware.js';
import { signupSchema } from '../schemas/signupSchema.js';

const authRouter = express.Router();

authRouter.post('/signup', jsonSchemaValidatorMiddleware(signupSchema), signup);

export default authRouter;
