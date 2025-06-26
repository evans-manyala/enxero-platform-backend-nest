import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';

export class UpdateNotificationDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  message?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  type?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;

  @IsOptional()
  data?: any;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  userId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  companyId?: string;
} 