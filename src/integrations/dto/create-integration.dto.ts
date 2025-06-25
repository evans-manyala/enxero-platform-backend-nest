import { IsString, IsOptional } from 'class-validator';

export class CreateIntegrationDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  config: any;

  @IsString()
  status: string;

  @IsString()
  companyId: string;
} 