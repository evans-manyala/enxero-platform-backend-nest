import { IsString, IsDateString, IsOptional, MaxLength } from 'class-validator';

export class CreateLeaveRequestDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @MaxLength(100)
  status: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  approvalNotes?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  rejectionNotes?: string;

  @IsOptional()
  @IsDateString()
  approvedAt?: string;

  @IsOptional()
  @IsDateString()
  rejectedAt?: string;

  @IsString()
  @MaxLength(50)
  employeeId: string;

  @IsString()
  @MaxLength(50)
  typeId: string;

  @IsString()
  @MaxLength(50)
  companyId: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  approverId?: string;
} 