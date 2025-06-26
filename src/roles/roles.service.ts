import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
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
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: string, data: UpdateRoleDto) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');
    return this.prisma.role.update({ where: { id }, data });
  }

  async remove(id: string) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');
    return this.prisma.role.delete({ where: { id } });
  }
} 