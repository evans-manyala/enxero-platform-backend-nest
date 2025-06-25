import { IsString, IsOptional } from 'class-validator';

export class UpdateIntegrationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  config?: any;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  companyId?: string;
} 