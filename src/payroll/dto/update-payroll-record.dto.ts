import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class UpdatePayrollRecordDto {
  @IsOptional()
  @IsDateString()
  payPeriodStart?: string;

  @IsOptional()
  @IsDateString()
  payPeriodEnd?: string;

  @IsOptional()
  @IsNumber()
  grossSalary?: number;

  @IsOptional()
  @IsNumber()
  totalDeductions?: number;

  @IsOptional()
  @IsNumber()
  netSalary?: number;

  @IsOptional()
  @IsNumber()
  workingDays?: number;

  @IsOptional()
  deductions?: any;

  @IsOptional()
  allowances?: any;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  processedAt?: string;

  @IsOptional()
  @IsString()
  employeeId?: string;

  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  periodId?: string;
} 