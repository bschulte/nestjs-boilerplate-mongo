import * as mongoose from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { Typegoose, prop } from 'typegoose';
import { ObjectType, Field, Authorized } from 'type-graphql';
import { UseGuards } from '@nestjs/common';

import { roles } from 'common/constants';
import { GqlRolesGuard } from 'modules/role/guards/graphqlRoles.guard';

@ObjectType()
export class LoginRecord extends Typegoose {
  @Field()
  @Authorized([roles.ADMIN])
  _id: string;

  @prop()
  @Field()
  userId: string;

  @prop()
  country: string;

  @prop()
  city: string;

  @prop()
  region: string;

  @prop()
  lat: number;

  @prop()
  long: number;

  @prop()
  ip: string;

  @prop()
  @Field()
  updatedAt: Date;

  @prop()
  @Field()
  createdAt: Date;
}

export const LoginRecordModel = new LoginRecord().getModelForClass(
  LoginRecord,
  {
    schemaOptions: { timestamps: true },
  },
);
