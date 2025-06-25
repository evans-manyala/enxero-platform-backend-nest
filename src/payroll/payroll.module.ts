import { Module } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PayrollPeriodService } from './payroll-period.service';
import { PayrollPeriodController } from './payroll-period.controller';

@Module({
  controllers: [PayrollController, PayrollPeriodController],
  providers: [PayrollService, PayrollPeriodService, PrismaService],
})
export class PayrollModule {} 