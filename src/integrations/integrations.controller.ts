import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { CreateIntegrationLogDto } from './dto/create-integration-log.dto';
import { UpdateIntegrationLogDto } from './dto/update-integration-log.dto';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  // IntegrationLog endpoints (move above :id route)
  @Post('logs')
  createIntegrationLog(@Body() dto: CreateIntegrationLogDto) {
    return this.integrationsService.createIntegrationLog(dto);
  }

  @Get('logs')
  findAllIntegrationLogs() {
    const result = this.integrationsService.findAllIntegrationLogs();
    console.log('DEBUG /integrations/logs endpoint hit, result:', result);
    return result;
  }

  @Get('logs/:id')
  findOneIntegrationLog(@Param('id') id: string) {
    return this.integrationsService.findOneIntegrationLog(id);
  }

  @Put('logs/:id')
  updateIntegrationLog(@Param('id') id: string, @Body() dto: UpdateIntegrationLogDto) {
    return this.integrationsService.updateIntegrationLog(id, dto);
  }

  @Delete('logs/:id')
  removeIntegrationLog(@Param('id') id: string) {
    return this.integrationsService.removeIntegrationLog(id);
  }

  // Integration endpoints
  @Post()
  createIntegration(@Body() dto: CreateIntegrationDto) {
    return this.integrationsService.createIntegration(dto);
  }

  @Get()
  findAllIntegrations() {
    return this.integrationsService.findAllIntegrations();
  }

  @Get(':id')
  findOneIntegration(@Param('id') id: string) {
    return this.integrationsService.findOneIntegration(id);
  }

  @Put(':id')
  updateIntegration(@Param('id') id: string, @Body() dto: UpdateIntegrationDto) {
    return this.integrationsService.updateIntegration(id, dto);
  }

  @Delete(':id')
  removeIntegration(@Param('id') id: string) {
    return this.integrationsService.removeIntegration(id);
  }
} 