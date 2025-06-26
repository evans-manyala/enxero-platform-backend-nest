import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { forms } from '@prisma/client';

@Injectable()
export class FormsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFormDto): Promise<forms> {
    const { id, updatedAt, ...rest } = dto as any;
    try {
      return await this.prisma.forms.create({ data: rest });
    } catch (error) {
      console.error('Error creating form:', error);
      throw error;
    }
  }

  async findAll(): Promise<forms[]> {
    return await this.prisma.forms.findMany();
  }

  async findOne(id: string): Promise<forms> {
    const form = await this.prisma.forms.findUnique({ where: { id } });
    if (!form) throw new NotFoundException('Form not found');
    return form;
  }

  async update(id: string, data: UpdateFormDto): Promise<forms> {
    const form = await this.prisma.forms.findUnique({ where: { id } });
    if (!form) throw new NotFoundException('Form not found');
    return await this.prisma.forms.update({ where: { id }, data });
  }

  async remove(id: string): Promise<forms> {
    const form = await this.prisma.forms.findUnique({ where: { id } });
    if (!form) throw new NotFoundException('Form not found');
    return await this.prisma.forms.delete({ where: { id } });
  }
} 