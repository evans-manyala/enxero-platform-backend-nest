import { IsString, IsOptional, IsInt, IsBoolean, MaxLength } from 'class-validator';

export class UpdateLeaveTypeDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsInt()
  maxDays?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  companyId?: string;
} 