import { IsString, IsOptional, IsBoolean, MaxLength, MinLength } from 'class-validator';

export class CreateFormDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  category: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
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