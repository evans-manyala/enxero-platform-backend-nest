import { IsString, IsOptional } from 'class-validator';

export class CreateIntegrationLogDto {
  @IsString()
  integrationId: string;

  @IsString()
  message: string;

  @IsString()
  type: string;

  @IsString()
  status: string;

  @IsOptional()
  data?: any;
} 