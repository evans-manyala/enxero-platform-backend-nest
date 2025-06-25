import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateFormDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsBoolean()
  isTemplate?: boolean;

  @IsOptional()
  settings?: any;

  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;
} 