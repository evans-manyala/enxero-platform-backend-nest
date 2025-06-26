import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { PayrollPeriodService } from './payroll-period.service';
import { CreatePayrollPeriodDto } from './dto/create-payroll-period.dto';
import { UpdatePayrollPeriodDto } from './dto/update-payroll-period.dto';

@Controller('payroll-periods')
export class PayrollPeriodController {
  constructor(private readonly payrollPeriodService: PayrollPeriodService) {}

  @Post()
  create(@Body() dto: CreatePayrollPeriodDto) {
    return this.payrollPeriodService.create(dto);
  }

  @Get()
  findAll() {
    return this.payrollPeriodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payrollPeriodService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePayrollPeriodDto) {
    return this.payrollPeriodService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payrollPeriodService.remove(id);
  }
} 