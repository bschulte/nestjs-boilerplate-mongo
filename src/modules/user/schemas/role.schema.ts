import * as mongoose from 'mongoose';
import { Typegoose, prop } from 'typegoose';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Role extends Typegoose {
  @prop()
  @Field()
  name: string;

  @prop()
  enabled: boolean;
}

export const RoleModel = new Role().getModelForClass(Role, {
  schemaOptions: { timestamps: true },
});
