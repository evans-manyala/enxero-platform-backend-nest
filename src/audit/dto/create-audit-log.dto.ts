import { IsString, IsOptional } from 'class-validator';

export class CreateAuditLogDto {
  @IsString()
  action: string;

  @IsString()
  entityType: string;

  @IsString()
  entityId: string;

  @IsString()
  userId: string;

  @IsOptional()
  metadata?: any;
} 