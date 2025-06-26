import { IsString, IsOptional, MaxLength, IsObject, IsUUID } from 'class-validator';

export class UpdateIntegrationLogDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  integrationId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  message?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  type?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;

  @IsOptional()
  @IsObject()
  data?: object;
} 