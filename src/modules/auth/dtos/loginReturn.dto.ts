import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class LoginReturnDto {
  @Field()
  expiresIn: string;

  @Field()
  accessToken: string;
}
