import { IsString, IsOptional, MaxLength, IsObject, IsUUID } from 'class-validator';

export class UpdateIntegrationDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  type?: string;

  @IsOptional()
  @IsObject()
  config?: object;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  companyId?: string;
} 