import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    try {
      const data: any = { ...dto, id: uuidv4() };
      if (data.userId === undefined) delete data.userId;
      if (data.companyId === undefined) delete data.companyId;
      return await this.prisma.notifications.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Duplicate notification');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.notifications.findMany();
  }

  async findOne(id: string) {
    const notification = await this.prisma.notifications.findUnique({ where: { id } });
    if (!notification) throw new NotFoundException('Notification not found');
    return notification;
  }

  async update(id: string, data: UpdateNotificationDto) {
    const notification = await this.prisma.notifications.findUnique({ where: { id } });
    if (!notification) throw new NotFoundException('Notification not found');
    return this.prisma.notifications.update({ where: { id }, data });
  }

  async remove(id: string) {
    const notification = await this.prisma.notifications.findUnique({ where: { id } });
    if (!notification) throw new NotFoundException('Notification not found');
    return this.prisma.notifications.delete({ where: { id } });
  }
} 