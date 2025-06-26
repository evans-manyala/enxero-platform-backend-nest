import { IsString, IsNumber, IsDateString, IsOptional, MaxLength } from 'class-validator';

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
  @MaxLength(100)
  status?: string;

  @IsOptional()
  @IsDateString()
  processedAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  employeeId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  companyId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  periodId?: string;
} 