import * as mongoose from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { Typegoose, prop, pre } from 'typegoose';
import { ObjectType, Field } from 'type-graphql';

import { Role } from 'modules/user/schemas/role.schema';

@ObjectType()
@pre<User>('save', function(next) {
  // Only hash the password if the field has been modified. In other words, don't generate
  // a new hash each time the user doc is saved.
  if (!this.isModified('password')) {
    return next();
  }

  // Hash the password before saving
  this.password = bcryptjs.hashSync((this as any).password, 10);

  next();
})
export class User extends Typegoose {
  id: string;

  @prop()
  @Field()
  email: string;

  @prop()
  password: string;

  @prop()
  lastLogin: Date;

  @prop({ default: 0 })
  loginAttempts: number;

  @prop({ default: false })
  locked: boolean;

  @prop()
  group: string;

  @prop()
  resetToken: string;

  @prop()
  resetTokenExpires: Date;

  @prop()
  @Field(() => [Role])
  roles: Role[];
}

export const UserModel = new User().getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
