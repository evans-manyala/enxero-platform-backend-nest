import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFileDto) {
    return this.prisma.files.create({ data });
  }

  async findAll() {
    return this.prisma.files.findMany();
  }

  async findOne(id: string) {
    return this.prisma.files.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateFileDto) {
    return this.prisma.files.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.files.delete({ where: { id } });
  }
} 