import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: '/images/avatar.png'
    }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
