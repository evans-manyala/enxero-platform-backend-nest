import { IsString, IsOptional, MaxLength, IsObject } from 'class-validator';

export class UpdateSystemLogDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  level?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  message?: string;

  @IsOptional()
  @IsObject()
  metadata?: object;
} 