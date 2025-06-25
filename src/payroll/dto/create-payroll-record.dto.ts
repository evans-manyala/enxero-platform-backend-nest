import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreatePayrollRecordDto {
  @IsDateString()
  payPeriodStart: string;

  @IsDateString()
  payPeriodEnd: string;

  @IsNumber()
  grossSalary: number;

  @IsNumber()
  totalDeductions: number;

  @IsNumber()
  netSalary: number;

  @IsNumber()
  workingDays: number;

  @IsOptional()
  deductions?: any;

  @IsOptional()
  allowances?: any;

  @IsString()
  status: string;

  @IsOptional()
  @IsDateString()
  processedAt?: string;

  @IsString()
  employeeId: string;

  @IsString()
  companyId: string;

  @IsString()
  periodId: string;
} 