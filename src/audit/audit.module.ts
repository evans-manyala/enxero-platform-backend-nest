import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AuditController],
  providers: [AuditService, PrismaService],
})
export class AuditModule {} 