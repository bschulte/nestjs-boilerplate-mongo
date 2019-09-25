export const schemaTemplate = (name: string, className: string) => {
  return `
import * as mongoose from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { Typegoose, prop } from 'typegoose';
import { ObjectType, Field, Authorized } from 'type-graphql';
import { UseGuards } from '@nestjs/common';

import { roles } from 'common/constants';
import { GqlRolesGuard } from 'modules/role/guards/graphqlRoles.guard';

@ObjectType()
export class ${className} extends Typegoose {
  @Field()
  @Authorized([roles.ADMIN])
  _id: string;

  @prop()
  @Field()
  field: string;

  @prop()
  @Field()
  updatedAt: Date;

  @prop()
  @Field()
  createdAt: Date;
}

export const ${className}Model = new ${className}().getModelForClass(${className}, {
  schemaOptions: { timestamps: true },
});
`;
};
