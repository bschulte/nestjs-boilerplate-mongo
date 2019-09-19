import * as mongoose from 'mongoose';
import * as bcryptjs from 'bcryptjs';

import { RoleSchema } from 'modules/role/role.schema';

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
  roles: [RoleSchema],
});

UserSchema.pre('save', function(next) {
  // Only hash the password if the field has been modified. In other words, don't generate
  // a new hash each time the user doc is saved.
  if (!(this as any).isModified('password')) {
    return next();
  }

  // Hash the password before saving
  (this as any).password = bcryptjs.hashSync((this as any).password, 10);

  next();
});
