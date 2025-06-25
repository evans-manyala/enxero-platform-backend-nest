import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  employeeId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsString()
  department: string;

  @IsString()
  position: string;

  @IsString()
  status: string;

  @IsDateString()
  hireDate: string;

  @IsOptional()
  @IsDateString()
  terminationDate?: string;

  @IsNumber()
  salary: number;

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

  @IsString()
  companyId: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  managerId?: string;
} 