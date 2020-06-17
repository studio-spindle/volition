import { IsString, MinLength, MaxLength, Matches } from "class-validator";
import { passwordMatch } from '../../validation-helpers';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(passwordMatch, { message: 'password too weak' })
  password: string;
}
