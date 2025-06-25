import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLeaveTypeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Type(() => Number)
  @IsInt()
  maxDays: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsString()
  companyId: string;
} 