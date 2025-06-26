import { IsString, MaxLength, IsObject, IsUUID, IsDefined } from 'class-validator';

export class CreateIntegrationDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(50)
  type: string;

  @IsDefined()
  @IsObject()
  config: object;

  @IsString()
  @MaxLength(20)
  status: string;

  @IsString()
  @IsUUID()
  companyId: string;
} 