import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    const { id, ...rest } = dto as any;
    return this.prisma.notifications.create({ data: rest });
  }

  async findAll() {
    return this.prisma.notifications.findMany();
  }

  async findOne(id: string) {
    return this.prisma.notifications.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateNotificationDto) {
    return this.prisma.notifications.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.notifications.delete({ where: { id } });
  }
} 