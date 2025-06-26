import { IsString, IsOptional, IsNumber, IsDateString, MaxLength, MinLength, IsEmail, IsObject } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  employeeId: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phoneNumber?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  department: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  position: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  status: string;

  @IsDateString()
  hireDate: string;

  @IsOptional()
  @IsDateString()
  terminationDate?: string;

  @IsNumber()
  salary: number;

  @IsOptional()
  @IsObject()
  emergencyContact?: object;

  @IsOptional()
  @IsObject()
  address?: object;

  @IsOptional()
  @IsObject()
  bankDetails?: object;

  @IsOptional()
  @IsObject()
  taxInfo?: object;

  @IsOptional()
  @IsObject()
  benefits?: object;

  @IsString()
  companyId: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  managerId?: string;
} 