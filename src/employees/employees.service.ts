import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEmployeeDto) {
    const { id, ...rest } = dto as any;
    try {
      return await this.prisma.employee.create({ data: rest });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Employee email or employeeId must be unique');
      }
      throw error;
    }
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