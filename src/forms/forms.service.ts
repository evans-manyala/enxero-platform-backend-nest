import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { forms } from '@prisma/client';

@Injectable()
export class FormsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFormDto): Promise<forms> {
    const { id, updatedAt, ...rest } = dto as any;
    return await this.prisma.forms.create({ data: rest });
  }

  async findAll(): Promise<forms[]> {
    return await this.prisma.forms.findMany();
  }

  async findOne(id: string): Promise<forms | null> {
    return await this.prisma.forms.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateFormDto): Promise<forms> {
    return await this.prisma.forms.update({ where: { id }, data });
  }

  async remove(id: string): Promise<forms> {
    return await this.prisma.forms.delete({ where: { id } });
  }
} 