import { IsString, IsOptional, MaxLength, IsUUID, IsObject } from 'class-validator';

export class CreateAuditLogDto {
  @IsString()
  @MaxLength(100)
  action: string;

  @IsString()
  @MaxLength(100)
  entityType: string;

  @IsString()
  @MaxLength(100)
  entityId: string;

  @IsString()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsObject()
  metadata?: object;
} 