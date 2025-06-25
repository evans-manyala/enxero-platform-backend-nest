import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class CreateLeaveTypeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  maxDays: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsString()
  companyId: string;
} 