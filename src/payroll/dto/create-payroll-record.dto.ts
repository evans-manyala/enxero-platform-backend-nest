import { IsString, IsNumber, IsDateString, IsOptional, MaxLength } from 'class-validator';

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
  @MaxLength(100)
  status: string;

  @IsOptional()
  @IsDateString()
  processedAt?: string;

  @IsString()
  @MaxLength(50)
  employeeId: string;

  @IsString()
  @MaxLength(50)
  companyId: string;

  @IsString()
  @MaxLength(50)
  periodId: string;
} 