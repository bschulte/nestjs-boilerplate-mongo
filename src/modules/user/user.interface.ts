import { Document } from 'mongoose';
import { IRole } from 'modules/role/role.interface';

export interface IUser extends Document {
  readonly name: string;
  readonly email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  loginAttempts: number;
  locked: boolean;
  group: string;
  resetToken: string;
  resetTokenExpires: Date;
  roles: IRole[];
}
