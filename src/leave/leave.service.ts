import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) {}

  // LeaveRequest CRUD
  async createLeaveRequest(data: CreateLeaveRequestDto) {
    return this.prisma.leaveRequest.create({ data });
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
  async createLeaveType(data: CreateLeaveTypeDto) {
    return this.prisma.leaveType.create({ data });
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