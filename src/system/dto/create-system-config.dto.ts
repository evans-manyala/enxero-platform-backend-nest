import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateSystemConfigDto {
  @IsString()
  key: string;

  value: any;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 