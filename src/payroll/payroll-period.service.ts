import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePayrollPeriodDto } from './dto/create-payroll-period.dto';
import { UpdatePayrollPeriodDto } from './dto/update-payroll-period.dto';

@Injectable()
export class PayrollPeriodService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePayrollPeriodDto) {
    return this.prisma.payrollPeriod.create({ data: dto });
  }

  async findAll() {
    return this.prisma.payrollPeriod.findMany();
  }

  async findOne(id: string) {
    const period = await this.prisma.payrollPeriod.findUnique({ where: { id } });
    if (!period) throw new NotFoundException('Payroll period not found');
    return period;
  }

  async update(id: string, dto: UpdatePayrollPeriodDto) {
    return this.prisma.payrollPeriod.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.payrollPeriod.delete({ where: { id } });
  }
} 