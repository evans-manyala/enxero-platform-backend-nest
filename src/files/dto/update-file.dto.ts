import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateFileDto {
  @IsOptional()
  @IsString()
  filename?: string;

  @IsOptional()
  @IsString()
  storageName?: string;

  @IsOptional()
  @IsString()
  mimetype?: string;

  @IsOptional()
  @IsInt()
  size?: number;

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