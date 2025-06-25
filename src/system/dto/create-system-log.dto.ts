import { IsString, IsOptional } from 'class-validator';

export class CreateSystemLogDto {
  @IsString()
  level: string;

  @IsString()
  message: string;

  @IsOptional()
  metadata?: any;
} 