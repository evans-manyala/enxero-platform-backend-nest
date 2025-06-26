import { IsString, IsOptional, IsBoolean, MaxLength, MinLength } from 'class-validator';

export class UpdateFormDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  category?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
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