import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LeaveService } from './leave.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';

@ApiTags('Leave')
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  // LeaveRequest endpoints
  @Post('requests')
  @ApiOperation({ summary: 'Create a new leave request' })
  @ApiResponse({ 
    status: 201, 
    description: 'Leave request created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Leave request created successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 409, description: 'Conflict - leave request already exists' })
  createLeaveRequest(@Body() dto: CreateLeaveRequestDto) {
    return this.leaveService.createLeaveRequest(dto);
  }

  @Get('requests')
  @ApiOperation({ summary: 'Get all leave requests' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of leave requests retrieved successfully',
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
  findAllLeaveRequests() {
    return this.leaveService.findAllLeaveRequests();
  }

  @Get('requests/:id')
  @ApiOperation({ summary: 'Get leave request by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Leave request ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Leave request retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Leave request not found' })
  findOneLeaveRequest(@Param('id') id: string) {
    return this.leaveService.findOneLeaveRequest(id);
  }

  @Put('requests/:id')
  @ApiOperation({ summary: 'Update leave request by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Leave request ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Leave request updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Leave request updated successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 404, description: 'Leave request not found' })
  updateLeaveRequest(@Param('id') id: string, @Body() dto: UpdateLeaveRequestDto) {
    return this.leaveService.updateLeaveRequest(id, dto);
  }

  @Delete('requests/:id')
  @ApiOperation({ summary: 'Delete leave request by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Leave request ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Leave request deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Leave request deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Leave request not found' })
  removeLeaveRequest(@Param('id') id: string) {
    return this.leaveService.removeLeaveRequest(id);
  }

  // LeaveType endpoints
  @Post('types')
  @ApiOperation({ summary: 'Create a new leave type' })
  @ApiResponse({ 
    status: 201, 
    description: 'Leave type created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Leave type created successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 409, description: 'Conflict - leave type already exists' })
  createLeaveType(@Body() dto: CreateLeaveTypeDto) {
    return this.leaveService.createLeaveType(dto);
  }

  @Get('types')
  @ApiOperation({ summary: 'Get all leave types' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of leave types retrieved successfully',
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
  findAllLeaveTypes() {
    return this.leaveService.findAllLeaveTypes();
  }

  @Get('types/:id')
  @ApiOperation({ summary: 'Get leave type by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Leave type ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Leave type retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Leave type not found' })
  findOneLeaveType(@Param('id') id: string) {
    return this.leaveService.findOneLeaveType(id);
  }

  @Put('types/:id')
  @ApiOperation({ summary: 'Update leave type by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Leave type ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Leave type updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Leave type updated successfully' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 404, description: 'Leave type not found' })
  updateLeaveType(@Param('id') id: string, @Body() dto: UpdateLeaveTypeDto) {
    return this.leaveService.updateLeaveType(id, dto);
  }

  @Delete('types/:id')
  @ApiOperation({ summary: 'Delete leave type by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Leave type ID', 
    example: '123e4567-e89b-12d3-a456-426614174000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Leave type deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Leave type deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Leave type not found' })
  removeLeaveType(@Param('id') id: string) {
    return this.leaveService.removeLeaveType(id);
  }
} 