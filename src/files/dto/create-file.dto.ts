import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateFileDto {
  @IsString()
  filename: string;

  @IsString()
  storageName: string;

  @IsString()
  mimetype: string;

  @IsInt()
  size: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  tags?: string[];

  @IsOptional()
  @IsString()
  entityType?: string;

  @IsOptional()
  @IsString()
  entityId?: string;
} 