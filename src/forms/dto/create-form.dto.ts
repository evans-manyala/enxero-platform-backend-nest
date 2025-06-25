import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateFormDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  category: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsBoolean()
  isTemplate?: boolean;

  @IsOptional()
  settings?: any;

  @IsString()
  companyId: string;

  @IsString()
  createdBy: string;
} 