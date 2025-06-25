import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  // LeaveRequest endpoints
  @Post('requests')
  createLeaveRequest(@Body() dto: CreateLeaveRequestDto) {
    return this.leaveService.createLeaveRequest(dto);
  }

  @Get('requests')
  findAllLeaveRequests() {
    return this.leaveService.findAllLeaveRequests();
  }

  @Get('requests/:id')
  findOneLeaveRequest(@Param('id') id: string) {
    return this.leaveService.findOneLeaveRequest(id);
  }

  @Put('requests/:id')
  updateLeaveRequest(@Param('id') id: string, @Body() dto: UpdateLeaveRequestDto) {
    return this.leaveService.updateLeaveRequest(id, dto);
  }

  @Delete('requests/:id')
  removeLeaveRequest(@Param('id') id: string) {
    return this.leaveService.removeLeaveRequest(id);
  }

  // LeaveType endpoints
  @Post('types')
  createLeaveType(@Body() dto: CreateLeaveTypeDto) {
    return this.leaveService.createLeaveType(dto);
  }

  @Get('types')
  findAllLeaveTypes() {
    return this.leaveService.findAllLeaveTypes();
  }

  @Get('types/:id')
  findOneLeaveType(@Param('id') id: string) {
    return this.leaveService.findOneLeaveType(id);
  }

  @Put('types/:id')
  updateLeaveType(@Param('id') id: string, @Body() dto: UpdateLeaveTypeDto) {
    return this.leaveService.updateLeaveType(id, dto);
  }

  @Delete('types/:id')
  removeLeaveType(@Param('id') id: string) {
    return this.leaveService.removeLeaveType(id);
  }
} 