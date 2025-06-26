import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { CreateIntegrationLogDto } from './dto/create-integration-log.dto';
import { UpdateIntegrationLogDto } from './dto/update-integration-log.dto';

@ApiTags('Integrations')
@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  // IntegrationLog endpoints (move above :id route)
  @Post('logs')
  @ApiOperation({ summary: 'Create a new integration log' })
  @ApiResponse({ 
    status: 201, 
    description: 'Integration log created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Integration log created successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  createIntegrationLog(@Body() dto: CreateIntegrationLogDto) {
    return this.integrationsService.createIntegrationLog(dto);
  }

  @Get('logs')
  @ApiOperation({ summary: 'Get all integration logs' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of integration logs retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'array',
          items: { type: 'object' },
        },
      },
    },
  })
  findAllIntegrationLogs() {
    const result = this.integrationsService.findAllIntegrationLogs();
    console.log('DEBUG /integrations/logs endpoint hit, result:', result);
    return result;
  }

  @Get('logs/:id')
  @ApiOperation({ summary: 'Get integration log by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Integration log ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Integration log retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Integration log not found' })
  findOneIntegrationLog(@Param('id') id: string) {
    return this.integrationsService.findOneIntegrationLog(id);
  }

  @Put('logs/:id')
  @ApiOperation({ summary: 'Update integration log by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Integration log ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Integration log updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Integration log updated successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 404, description: 'Integration log not found' })
  updateIntegrationLog(@Param('id') id: string, @Body() dto: UpdateIntegrationLogDto) {
    return this.integrationsService.updateIntegrationLog(id, dto);
  }

  @Delete('logs/:id')
  @ApiOperation({ summary: 'Delete integration log by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Integration log ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Integration log deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Integration log deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Integration log not found' })
  removeIntegrationLog(@Param('id') id: string) {
    return this.integrationsService.removeIntegrationLog(id);
  }

  // Integration endpoints
  @Post()
  @ApiOperation({ summary: 'Create a new integration' })
  @ApiResponse({ 
    status: 201, 
    description: 'Integration created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Integration created successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 409, description: 'Conflict - integration already exists' })
  createIntegration(@Body() dto: CreateIntegrationDto) {
    return this.integrationsService.createIntegration(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all integrations' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of integrations retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'array',
          items: { type: 'object' },
        },
      },
    },
  })
  findAllIntegrations() {
    return this.integrationsService.findAllIntegrations();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get integration by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Integration ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Integration retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  findOneIntegration(@Param('id') id: string) {
    return this.integrationsService.findOneIntegration(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update integration by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Integration ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Integration updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Integration updated successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  updateIntegration(@Param('id') id: string, @Body() dto: UpdateIntegrationDto) {
    return this.integrationsService.updateIntegration(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete integration by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Integration ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Integration deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Integration deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  removeIntegration(@Param('id') id: string) {
    return this.integrationsService.removeIntegration(id);
  }
} 