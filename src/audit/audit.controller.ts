import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';

@ApiTags('Audit')
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new audit log' })
  @ApiResponse({ 
    status: 201, 
    description: 'Audit log created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Audit log created successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 409, description: 'Conflict - audit log already exists' })
  create(@Body() dto: CreateAuditLogDto) {
    return this.auditService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all audit logs' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of audit logs retrieved successfully',
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
  findAll() {
    return this.auditService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get audit log by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Audit log ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Audit log retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Audit log not found' })
  findOne(@Param('id') id: string) {
    return this.auditService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update audit log by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Audit log ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Audit log updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Audit log updated successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 404, description: 'Audit log not found' })
  update(@Param('id') id: string, @Body() dto: UpdateAuditLogDto) {
    return this.auditService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete audit log by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Audit log ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Audit log deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Audit log deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Audit log not found' })
  remove(@Param('id') id: string) {
    return this.auditService.remove(id);
  }
} 