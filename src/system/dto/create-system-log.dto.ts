import { IsString, IsOptional, MaxLength, IsObject } from 'class-validator';

export class CreateSystemLogDto {
  @IsString()
  @MaxLength(20)
  level: string;

  @IsString()
  @MaxLength(500)
  message: string;

  @IsOptional()
  @IsObject()
  metadata?: object;
} 