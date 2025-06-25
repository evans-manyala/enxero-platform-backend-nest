import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  type: string;

  @IsString()
  category: string;

  @IsOptional()
  data?: any;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsString()
  companyId: string;
} 