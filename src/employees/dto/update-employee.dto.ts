import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  employeeId?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  hireDate?: string;

  @IsOptional()
  @IsDateString()
  terminationDate?: string;

  @IsOptional()
  @IsNumber()
  salary?: number;

  @IsOptional()
  emergencyContact?: any;

  @IsOptional()
  address?: any;

  @IsOptional()
  bankDetails?: any;

  @IsOptional()
  taxInfo?: any;

  @IsOptional()
  benefits?: any;

  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  managerId?: string;
} 