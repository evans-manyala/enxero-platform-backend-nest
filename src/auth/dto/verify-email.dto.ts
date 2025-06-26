import { IsString, MaxLength } from 'class-validator';

export class VerifyEmailDto {
  @IsString()
  @MaxLength(255)
  token: string;
} 