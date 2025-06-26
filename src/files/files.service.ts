import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFileDto) {
    const { id, ...rest } = dto as any;
    return this.prisma.files.create({ data: rest });
  }

  async findAll() {
    return this.prisma.files.findMany();
  }

  async findOne(id: string) {
    const file = await this.prisma.files.findUnique({ where: { id } });
    if (!file) throw new NotFoundException('File not found');
    return file;
  }

  async update(id: string, data: UpdateFileDto) {
    const file = await this.prisma.files.findUnique({ where: { id } });
    if (!file) throw new NotFoundException('File not found');
    return this.prisma.files.update({ where: { id }, data });
  }

  async remove(id: string) {
    const file = await this.prisma.files.findUnique({ where: { id } });
    if (!file) throw new NotFoundException('File not found');
    return this.prisma.files.delete({ where: { id } });
  }
} 