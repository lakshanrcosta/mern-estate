import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { createDatabaseConnection } from './db/dbConnect.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';

// Routes
import helloRoute from './routes/hello.route.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

createDatabaseConnection();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use('/api', helloRoute);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use(errorHandlerMiddleware);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
