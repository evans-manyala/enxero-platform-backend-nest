import { IsString, IsOptional, MaxLength, IsUUID, IsObject } from 'class-validator';

export class UpdateAuditLogDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  action?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  entityType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  entityId?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsObject()
  metadata?: object;
} 