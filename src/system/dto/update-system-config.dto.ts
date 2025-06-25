import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateSystemConfigDto {
  @IsOptional()
  @IsString()
  key?: string;

  @IsOptional()
  value?: any;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 