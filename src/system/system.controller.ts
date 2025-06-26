import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SystemService } from './system.service';
import { CreateSystemConfigDto } from './dto/create-system-config.dto';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';
import { CreateSystemLogDto } from './dto/create-system-log.dto';
import { UpdateSystemLogDto } from './dto/update-system-log.dto';

@ApiTags('System')
@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  // SystemConfig endpoints
  @Post('configs')
  @ApiOperation({ summary: 'Create a new system configuration' })
  @ApiResponse({ 
    status: 201, 
    description: 'System configuration created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'System configuration created successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 409, description: 'Conflict - configuration already exists' })
  createConfig(@Body() dto: CreateSystemConfigDto) {
    return this.systemService.createConfig(dto);
  }

  @Get('configs')
  @ApiOperation({ summary: 'Get all system configurations' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of system configurations retrieved successfully',
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
  findAllConfigs() {
    return this.systemService.findAllConfigs();
  }

  @Get('configs/:id')
  @ApiOperation({ summary: 'Get system configuration by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'System configuration ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'System configuration retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'System configuration not found' })
  findOneConfig(@Param('id') id: string) {
    return this.systemService.findOneConfig(id);
  }

  @Put('configs/:id')
  @ApiOperation({ summary: 'Update system configuration by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'System configuration ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'System configuration updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'System configuration updated successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 404, description: 'System configuration not found' })
  updateConfig(@Param('id') id: string, @Body() dto: UpdateSystemConfigDto) {
    return this.systemService.updateConfig(id, dto);
  }

  @Delete('configs/:id')
  @ApiOperation({ summary: 'Delete system configuration by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'System configuration ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'System configuration deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'System configuration deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'System configuration not found' })
  removeConfig(@Param('id') id: string) {
    return this.systemService.removeConfig(id);
  }

  // SystemLog endpoints
  @Post('logs')
  @ApiOperation({ summary: 'Create a new system log' })
  @ApiResponse({ 
    status: 201, 
    description: 'System log created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'System log created successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  createLog(@Body() dto: CreateSystemLogDto) {
    return this.systemService.createLog(dto);
  }

  @Get('logs')
  @ApiOperation({ summary: 'Get all system logs' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of system logs retrieved successfully',
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
  findAllLogs() {
    return this.systemService.findAllLogs();
  }

  @Get('logs/:id')
  @ApiOperation({ summary: 'Get system log by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'System log ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'System log retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'System log not found' })
  findOneLog(@Param('id') id: string) {
    return this.systemService.findOneLog(id);
  }

  @Put('logs/:id')
  @ApiOperation({ summary: 'Update system log by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'System log ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'System log updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'System log updated successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 404, description: 'System log not found' })
  updateLog(@Param('id') id: string, @Body() dto: UpdateSystemLogDto) {
    return this.systemService.updateLog(id, dto);
  }

  @Delete('logs/:id')
  @ApiOperation({ summary: 'Delete system log by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'System log ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'System log deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'System log deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'System log not found' })
  removeLog(@Param('id') id: string) {
    return this.systemService.removeLog(id);
  }
} 