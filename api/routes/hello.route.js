import express from 'express';
import { hello } from '../controllers/hello.controller.js';

const helloRouter = express.Router();

helloRouter.get('/hello', hello);

export default helloRouter;
