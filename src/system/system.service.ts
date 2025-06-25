import { Injectable } from '@nestjs/common';
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
    return this.prisma.systemConfig.create({ data });
  }

  async findAllConfigs() {
    return this.prisma.systemConfig.findMany();
  }

  async findOneConfig(id: string) {
    return this.prisma.systemConfig.findUnique({ where: { id } });
  }

  async updateConfig(id: string, data: UpdateSystemConfigDto) {
    return this.prisma.systemConfig.update({ where: { id }, data });
  }

  async removeConfig(id: string) {
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
    return this.prisma.systemLog.findUnique({ where: { id } });
  }

  async updateLog(id: string, data: UpdateSystemLogDto) {
    return this.prisma.systemLog.update({ where: { id }, data });
  }

  async removeLog(id: string) {
    return this.prisma.systemLog.delete({ where: { id } });
  }
} 