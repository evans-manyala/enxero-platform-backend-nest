import { IsString, IsOptional, IsInt, MaxLength } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @MaxLength(255)
  filename: string;

  @IsString()
  @MaxLength(255)
  storageName: string;

  @IsString()
  @MaxLength(255)
  mimetype: string;

  @IsInt()
  size: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsString({ each: true })
  @MaxLength(255, { each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(50)
  entityType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  entityId?: string;
} 