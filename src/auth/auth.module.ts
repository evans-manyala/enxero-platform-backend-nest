import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SecurityService } from './security.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerService } from '../mailer.service';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, SecurityService, ConfigService, MailerService],
  exports: [AuthService],
})
export class AuthModule {} 