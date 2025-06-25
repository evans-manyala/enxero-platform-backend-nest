import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePayrollRecordDto } from './dto/create-payroll-record.dto';
import { UpdatePayrollRecordDto } from './dto/update-payroll-record.dto';

@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePayrollRecordDto) {
    const { id, ...rest } = dto as any;
    return this.prisma.payrollRecord.create({ data: rest });
  }

  async findAll() {
    return this.prisma.payrollRecord.findMany();
  }

  async findOne(id: string) {
    return this.prisma.payrollRecord.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdatePayrollRecordDto) {
    return this.prisma.payrollRecord.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.payrollRecord.delete({ where: { id } });
  }
} 