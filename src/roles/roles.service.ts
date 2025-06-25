import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRoleDto) {
    const { id, ...rest } = dto as any;
    return this.prisma.role.create({ data: rest });
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