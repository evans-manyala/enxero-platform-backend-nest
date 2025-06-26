import { IsEmail, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestEmailVerificationDto {
  @ApiProperty({
    description: 'Email address to send verification link to',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsEmail()
  @MaxLength(255)
  email: string;
} 