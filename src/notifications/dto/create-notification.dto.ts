import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(500)
  message: string;

  @IsString()
  @MaxLength(100)
  type: string;

  @IsString()
  @MaxLength(100)
  category: string;

  @IsOptional()
  data?: any;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  userId?: string;

  @IsString()
  @MaxLength(50)
  companyId: string;
} 