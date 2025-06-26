import { IsEmail, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestPasswordResetDto {
  @ApiProperty({
    description: 'Email address to send password reset link to',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsEmail()
  @MaxLength(255)
  email: string;
} 