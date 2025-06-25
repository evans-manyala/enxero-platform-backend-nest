import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { CreateIntegrationLogDto } from './dto/create-integration-log.dto';
import { UpdateIntegrationLogDto } from './dto/update-integration-log.dto';

@Injectable()
export class IntegrationsService {
  constructor(private prisma: PrismaService) {}

  // Integration CRUD
  async createIntegration(dto: CreateIntegrationDto) {
    const { id, ...rest } = dto as any;
    return this.prisma.integration.create({ data: rest });
  }

  async findAllIntegrations() {
    return this.prisma.integration.findMany();
  }

  async findOneIntegration(id: string) {
    return this.prisma.integration.findUnique({ where: { id } });
  }

  async updateIntegration(id: string, data: UpdateIntegrationDto) {
    return this.prisma.integration.update({ where: { id }, data });
  }

  async removeIntegration(id: string) {
    return this.prisma.integration.delete({ where: { id } });
  }

  // IntegrationLog CRUD
  async createIntegrationLog(dto: CreateIntegrationLogDto) {
    const { id, ...rest } = dto as any;
    return this.prisma.integrationLog.create({ data: rest });
  }

  async findAllIntegrationLogs() {
    return this.prisma.integrationLog.findMany();
  }

  async findOneIntegrationLog(id: string) {
    return this.prisma.integrationLog.findUnique({ where: { id } });
  }

  async updateIntegrationLog(id: string, data: UpdateIntegrationLogDto) {
    return this.prisma.integrationLog.update({ where: { id }, data });
  }

  async removeIntegrationLog(id: string) {
    return this.prisma.integrationLog.delete({ where: { id } });
  }
} 