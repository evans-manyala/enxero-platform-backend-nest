import { IsString, IsOptional, IsBoolean, MaxLength, IsObject } from 'class-validator';

export class UpdateSystemConfigDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  key?: string;

  @IsOptional()
  @IsObject()
  value?: object;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 