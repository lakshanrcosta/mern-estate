import express from 'express';
import dotenv from 'dotenv';
import { createDatabaseConnection } from './db/dbConnect.js';

// Routes
import userRouter from './routes/user.route.js';

dotenv.config();

createDatabaseConnection();

const app = express();

app.use('/api/user', userRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
