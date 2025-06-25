import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateLeaveRequestDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  approvalNotes?: string;

  @IsOptional()
  @IsString()
  rejectionNotes?: string;

  @IsOptional()
  @IsDateString()
  approvedAt?: string;

  @IsOptional()
  @IsDateString()
  rejectedAt?: string;

  @IsString()
  employeeId: string;

  @IsString()
  typeId: string;

  @IsString()
  companyId: string;

  @IsOptional()
  @IsString()
  approverId?: string;
} 