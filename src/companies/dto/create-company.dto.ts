import { IsString, IsOptional, IsBoolean, MaxLength, MinLength, IsObject } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  identifier?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  fullName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  shortName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  workPhone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsObject()
  address?: object;

  @IsOptional()
  @IsObject()
  settings?: object;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 