import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEmployeeDto) {
    return this.prisma.employee.create({ data });
  }

  async findAll() {
    return this.prisma.employee.findMany();
  }

  async findOne(id: string) {
    return this.prisma.employee.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateEmployeeDto) {
    return this.prisma.employee.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.employee.delete({ where: { id } });
  }
} 