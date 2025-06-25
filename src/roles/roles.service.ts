import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRoleDto) {
    const { id, ...rest } = dto as any;
    try {
      return await this.prisma.role.create({ data: rest });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Role name must be unique');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: string) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateRoleDto) {
    return this.prisma.role.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.role.delete({ where: { id } });
  }
} 