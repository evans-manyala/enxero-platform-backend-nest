import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { CreateIntegrationLogDto } from './dto/create-integration-log.dto';
import { UpdateIntegrationLogDto } from './dto/update-integration-log.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class IntegrationsService {
  constructor(private prisma: PrismaService) {}

  // Integration CRUD
  async createIntegration(dto: CreateIntegrationDto) {
    const { id, ...rest } = dto as any;
    try {
      return await this.prisma.integration.create({ data: rest });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Integration with this name already exists for this company');
      }
      throw error;
    }
  }

  async findAllIntegrations() {
    return this.prisma.integration.findMany();
  }

  async findOneIntegration(id: string) {
    const integration = await this.prisma.integration.findUnique({ where: { id } });
    if (!integration) throw new NotFoundException('Integration not found');
    return integration;
  }

  async updateIntegration(id: string, data: UpdateIntegrationDto) {
    const exists = await this.prisma.integration.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Integration not found');
    return this.prisma.integration.update({ where: { id }, data });
  }

  async removeIntegration(id: string) {
    const exists = await this.prisma.integration.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Integration not found');
    return this.prisma.integration.delete({ where: { id } });
  }

  // IntegrationLog CRUD
  async createIntegrationLog(dto: CreateIntegrationLogDto) {
    const { id, ...rest } = dto as any;
    try {
      return await this.prisma.integrationLog.create({ data: rest });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        throw new NotFoundException('Integration not found');
      }
      throw error;
    }
  }

  async findAllIntegrationLogs() {
    return this.prisma.integrationLog.findMany();
  }

  async findOneIntegrationLog(id: string) {
    const log = await this.prisma.integrationLog.findUnique({ where: { id } });
    if (!log) throw new NotFoundException('IntegrationLog not found');
    return log;
  }

  async updateIntegrationLog(id: string, data: UpdateIntegrationLogDto) {
    const exists = await this.prisma.integrationLog.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('IntegrationLog not found');
    return this.prisma.integrationLog.update({ where: { id }, data });
  }

  async removeIntegrationLog(id: string) {
    const exists = await this.prisma.integrationLog.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('IntegrationLog not found');
    return this.prisma.integrationLog.delete({ where: { id } });
  }
} 