import { IsString, IsOptional, IsArray, IsBoolean, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsArray()
  @IsString({ each: true })
  permissions: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 