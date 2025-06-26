import { IsString, IsOptional, MaxLength } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @MaxLength(1024)
  refreshToken: string;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;
} 