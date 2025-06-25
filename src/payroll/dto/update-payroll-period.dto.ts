import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdatePayrollPeriodDto {
  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  status?: string;
} 