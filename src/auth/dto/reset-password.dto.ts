import { IsString, MinLength, MaxLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  newPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  confirmPassword: string;
} 