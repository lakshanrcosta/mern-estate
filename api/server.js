import express from 'express';
import dotenv from 'dotenv';
import { createDatabaseConnection } from './db/dbConnect.js';

// Routes
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

createDatabaseConnection();

const app = express();

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
