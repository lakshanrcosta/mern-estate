import mongoose from 'mongoose';

export const createDatabaseConnection = () => {
  const connectionString = process.env.MONGO_DB_URL;
  mongoose.connect(connectionString);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB Atlas!');
  });
};
