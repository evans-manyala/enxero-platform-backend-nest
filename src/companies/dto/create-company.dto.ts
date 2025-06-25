import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  identifier?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  shortName?: string;

  @IsOptional()
  @IsString()
  workPhone?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  address?: any;

  @IsOptional()
  settings?: any;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 