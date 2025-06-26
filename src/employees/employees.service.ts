import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Prisma, Employee } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    const data: Prisma.EmployeeCreateInput = {
      employeeId: dto.employeeId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      department: dto.department,
      position: dto.position,
      status: dto.status,
      hireDate: dto.hireDate ? new Date(dto.hireDate) : new Date(),
      terminationDate: dto.terminationDate
        ? new Date(dto.terminationDate)
        : undefined,
      salary: dto.salary !== undefined ? dto.salary.toString() : '0',
      emergencyContact: dto.emergencyContact,
      address: dto.address,
      bankDetails: dto.bankDetails,
      taxInfo: dto.taxInfo,
      benefits: dto.benefits,
      company: { connect: { id: dto.companyId } },
      user: dto.userId ? { connect: { id: dto.userId } } : undefined,
      manager: dto.managerId ? { connect: { id: dto.managerId } } : undefined,
    };
    try {
      return (await this.prisma.employee.create({ data })) as Employee;
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          'Employee email or employeeId must be unique',
        );
      }
      throw error;
    }
  }

  findAll(): Promise<Employee[]> {
    return this.prisma.employee.findMany() as Promise<Employee[]>;
  }

  async findOne(id: string): Promise<Employee> {
    const employee = (await this.prisma.employee.findUnique({ where: { id } })) as Employee | null;
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async update(id: string, data: UpdateEmployeeDto): Promise<Employee> {
    const employee = (await this.prisma.employee.findUnique({ where: { id } })) as Employee | null;
    if (!employee) throw new NotFoundException('Employee not found');
    return (await this.prisma.employee.update({ where: { id }, data })) as Employee;
  }

  async remove(id: string): Promise<Employee> {
    const employee = (await this.prisma.employee.findUnique({ where: { id } })) as Employee | null;
    if (!employee) throw new NotFoundException('Employee not found');
    return (await this.prisma.employee.delete({ where: { id } })) as Employee;
  }
} 