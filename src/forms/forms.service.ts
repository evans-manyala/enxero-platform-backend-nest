import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@Injectable()
export class FormsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFormDto) {
    return this.prisma.forms.create({ data });
  }

  async findAll() {
    return this.prisma.forms.findMany();
  }

  async findOne(id: string) {
    return this.prisma.forms.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateFormDto) {
    return this.prisma.forms.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.forms.delete({ where: { id } });
  }
} 