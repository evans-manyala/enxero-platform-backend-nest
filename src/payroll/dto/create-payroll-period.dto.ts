import { IsString, IsDateString } from 'class-validator';

export class CreatePayrollPeriodDto {
  @IsString()
  companyId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  status: string;
} 