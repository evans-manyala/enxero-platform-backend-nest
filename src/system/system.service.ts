import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSystemConfigDto } from './dto/create-system-config.dto';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';
import { CreateSystemLogDto } from './dto/create-system-log.dto';
import { UpdateSystemLogDto } from './dto/update-system-log.dto';

@Injectable()
export class SystemService {
  constructor(private prisma: PrismaService) {}

  // SystemConfig CRUD
  async createConfig(data: CreateSystemConfigDto) {
    try {
      return await this.prisma.systemConfig.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('SystemConfig key must be unique');
      }
      throw error;
    }
  }

  async findAllConfigs() {
    return this.prisma.systemConfig.findMany();
  }

  async findOneConfig(id: string) {
    const config = await this.prisma.systemConfig.findUnique({ where: { id } });
    if (!config) throw new NotFoundException('SystemConfig not found');
    return config;
  }

  async updateConfig(id: string, data: UpdateSystemConfigDto) {
    const exists = await this.prisma.systemConfig.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('SystemConfig not found');
    try {
      return await this.prisma.systemConfig.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('SystemConfig key must be unique');
      }
      throw error;
    }
  }

  async removeConfig(id: string) {
    const exists = await this.prisma.systemConfig.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('SystemConfig not found');
    return this.prisma.systemConfig.delete({ where: { id } });
  }

  // SystemLog CRUD
  async createLog(data: CreateSystemLogDto) {
    return this.prisma.systemLog.create({ data });
  }

  async findAllLogs() {
    return this.prisma.systemLog.findMany();
  }

  async findOneLog(id: string) {
    const log = await this.prisma.systemLog.findUnique({ where: { id } });
    if (!log) throw new NotFoundException('SystemLog not found');
    return log;
  }

  async updateLog(id: string, data: UpdateSystemLogDto) {
    const exists = await this.prisma.systemLog.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('SystemLog not found');
    return this.prisma.systemLog.update({ where: { id }, data });
  }

  async removeLog(id: string) {
    const exists = await this.prisma.systemLog.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('SystemLog not found');
    return this.prisma.systemLog.delete({ where: { id } });
  }

  async createSystemConfig(dto: CreateSystemConfigDto) {
    const { id, ...rest } = dto as any;
    return this.prisma.systemConfig.create({ data: rest });
  }

  async createSystemLog(dto: CreateSystemLogDto) {
    const { id, ...rest } = dto as any;
    return this.prisma.systemLog.create({ data: rest });
  }
} 