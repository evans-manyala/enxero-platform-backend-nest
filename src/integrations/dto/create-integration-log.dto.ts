import { IsString, IsOptional, MaxLength, IsObject, IsUUID } from 'class-validator';

export class CreateIntegrationLogDto {
  @IsString()
  @IsUUID()
  integrationId: string;

  @IsString()
  @MaxLength(500)
  message: string;

  @IsString()
  @MaxLength(50)
  type: string;

  @IsString()
  @MaxLength(20)
  status: string;

  @IsOptional()
  @IsObject()
  data?: object;
} 