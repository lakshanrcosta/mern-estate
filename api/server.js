import express from 'express';
import dotenv from 'dotenv';
import { createDatabaseConnection } from './db/dbConnect.js';

dotenv.config();

createDatabaseConnection();

const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
