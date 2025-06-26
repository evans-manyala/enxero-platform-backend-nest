import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PayrollService } from './payroll.service';
import { CreatePayrollRecordDto } from './dto/create-payroll-record.dto';
import { UpdatePayrollRecordDto } from './dto/update-payroll-record.dto';

@ApiTags('Payroll')
@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payroll record' })
  @ApiResponse({ 
    status: 201, 
    description: 'Payroll record created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Payroll record created successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 409, description: 'Conflict - payroll record already exists' })
  create(@Body() dto: CreatePayrollRecordDto) {
    return this.payrollService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payroll records' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of payroll records retrieved successfully',
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
    return this.payrollService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payroll record by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Payroll record ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Payroll record retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Payroll record not found' })
  findOne(@Param('id') id: string) {
    return this.payrollService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update payroll record by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Payroll record ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Payroll record updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Payroll record updated successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 404, description: 'Payroll record not found' })
  update(@Param('id') id: string, @Body() dto: UpdatePayrollRecordDto) {
    return this.payrollService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete payroll record by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Payroll record ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Payroll record deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Payroll record deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Payroll record not found' })
  remove(@Param('id') id: string) {
    return this.payrollService.remove(id);
  }
} 