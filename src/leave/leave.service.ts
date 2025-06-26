import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) {}

  // LeaveRequest CRUD
  async createLeaveRequest(dto: CreateLeaveRequestDto) {
    const { id, ...rest } = dto as any;
    return this.prisma.leaveRequest.create({ data: rest });
  }

  async findAllLeaveRequests() {
    return this.prisma.leaveRequest.findMany();
  }

  async findOneLeaveRequest(id: string) {
    return this.prisma.leaveRequest.findUnique({ where: { id } });
  }

  async updateLeaveRequest(id: string, data: UpdateLeaveRequestDto) {
    return this.prisma.leaveRequest.update({ where: { id }, data });
  }

  async removeLeaveRequest(id: string) {
    return this.prisma.leaveRequest.delete({ where: { id } });
  }

  // LeaveType CRUD
  async createLeaveType(dto: CreateLeaveTypeDto) {
    const { id, ...rest } = dto as any;
    try {
      return await this.prisma.leaveType.create({ data: rest });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Duplicate leave type for company');
      }
      throw error;
    }
  }

  async findAllLeaveTypes() {
    return this.prisma.leaveType.findMany();
  }

  async findOneLeaveType(id: string) {
    return this.prisma.leaveType.findUnique({ where: { id } });
  }

  async updateLeaveType(id: string, data: UpdateLeaveTypeDto) {
    return this.prisma.leaveType.update({ where: { id }, data });
  }

  async removeLeaveType(id: string) {
    return this.prisma.leaveType.delete({ where: { id } });
  }
} 