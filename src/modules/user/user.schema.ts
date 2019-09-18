import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
  loginAttempts: Number,
  locked: Boolean,
  group: String,
  resetToken: String,
  resetTokenExpires: Date,
});
