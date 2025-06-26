import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePayrollRecordDto } from './dto/create-payroll-record.dto';
import { UpdatePayrollRecordDto } from './dto/update-payroll-record.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePayrollRecordDto) {
    const { id, ...rest } = dto as any;
    try {
      return await this.prisma.payrollRecord.create({ data: rest });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Duplicate payroll record for employee and period');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.payrollRecord.findMany();
  }

  async findOne(id: string) {
    const record = await this.prisma.payrollRecord.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Payroll record not found');
    return record;
  }

  async update(id: string, data: UpdatePayrollRecordDto) {
    const record = await this.prisma.payrollRecord.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Payroll record not found');
    return this.prisma.payrollRecord.update({ where: { id }, data });
  }

  async remove(id: string) {
    const record = await this.prisma.payrollRecord.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Payroll record not found');
    return this.prisma.payrollRecord.delete({ where: { id } });
  }
} 