import { IsEmail, IsString } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
