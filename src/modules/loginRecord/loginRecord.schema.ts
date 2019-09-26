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
  userId: string;

  @prop()
  @Field()
  country: string;

  @prop()
  @Field()
  city: string;

  @prop()
  @Field()
  region: string;

  @prop()
  @Field()
  lat: number;

  @prop()
  @Field()
  long: number;

  @prop()
  @Field()
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
