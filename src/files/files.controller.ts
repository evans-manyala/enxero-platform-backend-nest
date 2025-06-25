import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@Body() dto: CreateFileDto) {
    return this.filesService.create(dto);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFileDto) {
    return this.filesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
} 