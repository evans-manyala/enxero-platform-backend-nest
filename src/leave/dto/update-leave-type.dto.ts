import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class UpdateLeaveTypeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  maxDays?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  companyId?: string;
} 