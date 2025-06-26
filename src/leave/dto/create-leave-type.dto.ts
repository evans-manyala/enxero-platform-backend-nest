import { IsString, IsOptional, IsInt, IsBoolean, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLeaveTypeDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @Type(() => Number)
  @IsInt()
  maxDays: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsString()
  @MaxLength(50)
  companyId: string;
} 