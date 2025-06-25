import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAuditLogDto) {
    return this.prisma.audit_logs.create({ data });
  }

  async findAll() {
    return this.prisma.audit_logs.findMany();
  }

  async findOne(id: string) {
    return this.prisma.audit_logs.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateAuditLogDto) {
    return this.prisma.audit_logs.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.audit_logs.delete({ where: { id } });
  }
} 