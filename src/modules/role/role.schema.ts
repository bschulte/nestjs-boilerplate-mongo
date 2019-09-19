import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
  name: String,
  enabled: Boolean,
});
