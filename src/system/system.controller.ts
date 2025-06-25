import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SystemService } from './system.service';
import { CreateSystemConfigDto } from './dto/create-system-config.dto';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';
import { CreateSystemLogDto } from './dto/create-system-log.dto';
import { UpdateSystemLogDto } from './dto/update-system-log.dto';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  // SystemConfig endpoints
  @Post('configs')
  createConfig(@Body() dto: CreateSystemConfigDto) {
    return this.systemService.createConfig(dto);
  }

  @Get('configs')
  findAllConfigs() {
    return this.systemService.findAllConfigs();
  }

  @Get('configs/:id')
  findOneConfig(@Param('id') id: string) {
    return this.systemService.findOneConfig(id);
  }

  @Put('configs/:id')
  updateConfig(@Param('id') id: string, @Body() dto: UpdateSystemConfigDto) {
    return this.systemService.updateConfig(id, dto);
  }

  @Delete('configs/:id')
  removeConfig(@Param('id') id: string) {
    return this.systemService.removeConfig(id);
  }

  // SystemLog endpoints
  @Post('logs')
  createLog(@Body() dto: CreateSystemLogDto) {
    return this.systemService.createLog(dto);
  }

  @Get('logs')
  findAllLogs() {
    return this.systemService.findAllLogs();
  }

  @Get('logs/:id')
  findOneLog(@Param('id') id: string) {
    return this.systemService.findOneLog(id);
  }

  @Put('logs/:id')
  updateLog(@Param('id') id: string, @Body() dto: UpdateSystemLogDto) {
    return this.systemService.updateLog(id, dto);
  }

  @Delete('logs/:id')
  removeLog(@Param('id') id: string) {
    return this.systemService.removeLog(id);
  }
} 