import { IsString, IsOptional } from 'class-validator';

export class UpdateSystemLogDto {
  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  metadata?: any;
} 