import * as mongoose from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { Typegoose, prop, pre } from 'typegoose';
import { ObjectType, Field, Authorized } from 'type-graphql';
import { UseGuards } from '@nestjs/common';

import { Role } from 'modules/user/schemas/role.schema';
import { roles } from 'common/constants';
import { Roles } from 'modules/role/decorators/roles.decorator';
import { GqlRolesGuard } from 'modules/role/guards/graphqlRoles.guard';
import { LoginRecord } from 'modules/loginRecord/loginRecord.schema';

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
  @Field()
  @Authorized([roles.ADMIN])
  _id: string;

  @prop()
  @Field()
  email: string;

  @prop()
  password: string;

  @prop()
  @Field()
  lastLogin: Date;

  @Field()
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

  @prop()
  @Field(() => [LoginRecord])
  loginRecords: LoginRecord[];

  @prop()
  @Field()
  updatedAt: Date;

  @prop()
  @Field()
  createdAt: Date;
}

export const UserModel = new User().getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
