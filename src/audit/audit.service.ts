import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAuditLogDto) {
    const { id, ...rest } = dto as any;
    try {
      return await this.prisma.audit_logs.create({ data: rest });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.audit_logs.findMany();
  }

  async findOne(id: string) {
    const log = await this.prisma.audit_logs.findUnique({ where: { id } });
    if (!log) throw new NotFoundException('Audit log not found');
    return log;
  }

  async update(id: string, data: UpdateAuditLogDto) {
    const exists = await this.prisma.audit_logs.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Audit log not found');
    try {
      return await this.prisma.audit_logs.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  async remove(id: string) {
    const exists = await this.prisma.audit_logs.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Audit log not found');
    return this.prisma.audit_logs.delete({ where: { id } });
  }
} 