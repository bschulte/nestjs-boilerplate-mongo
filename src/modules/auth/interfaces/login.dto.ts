import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
