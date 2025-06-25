import { IsString, IsOptional } from 'class-validator';

export class UpdateIntegrationLogDto {
  @IsOptional()
  @IsString()
  integrationId?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  data?: any;
} 