import { IsString, IsOptional, IsNumber, IsDateString, MaxLength, MinLength, IsEmail, IsObject } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  employeeId?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  department?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  position?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
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