import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthResponse } from './interfaces/auth-response.interface';
import { SecurityService } from './security.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RequestEmailVerificationDto } from './dto/request-email-verification.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { MailerService } from '../mailer.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly securityService: SecurityService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async register(data: RegisterDto): Promise<AuthResponse> {
    const { email, username, password, firstName, lastName, ipAddress, userAgent } = data;
    // Check if user exists
    const existingUser = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Get default role
    const defaultRole = await this.prisma.role.findFirst({ where: { name: 'USER' } });
    if (!defaultRole) {
      throw new InternalServerErrorException('Default role not found');
    }
    // Create default company
    const defaultCompany = await this.prisma.company.create({
      data: {
        name: `${firstName}'s Company`,
        identifier: username.toUpperCase(),
        isActive: true,
      },
    });
    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        roleId: defaultRole.id,
        companyId: defaultCompany.id,
      },
      include: { role: true },
    });
    // Generate tokens
    const tokens = this.generateTokens(user);
    // Create session
    await this.securityService.createSession(user.id, tokens.refreshToken, ipAddress, userAgent);
    // Track activity
    await this.securityService.trackActivity(user.id, 'USER_REGISTERED', { username: user.username }, ipAddress, userAgent);
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role?.name || 'USER',
        companyId: user.companyId,
      },
    };
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    const { email, password, ipAddress, userAgent } = data;
    const user = await this.prisma.user.findUnique({ where: { email }, include: { role: true } });
    if (!user) {
      await this.securityService.trackFailedLoginAttempt(email, ipAddress, userAgent);
      throw new UnauthorizedException('Invalid credentials');
    }
    const isLocked = await this.securityService.isAccountLocked(user.id);
    if (isLocked) {
      throw new UnauthorizedException('Account is locked due to too many failed attempts. Please try again later.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      await this.securityService.trackFailedLoginAttempt(email, ipAddress, userAgent);
      throw new UnauthorizedException('Invalid credentials');
    }
    await this.prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });
    const tokens = this.generateTokens(user);
    await this.securityService.createSession(user.id, tokens.refreshToken, ipAddress, userAgent);
    await this.securityService.trackActivity(user.id, 'USER_LOGGED_IN', { username: user.username }, ipAddress, userAgent);
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role?.name || 'USER',
        companyId: user.companyId,
      },
    };
  }

  async refreshToken(data: RefreshTokenDto): Promise<AuthResponse> {
    const { refreshToken, ipAddress, userAgent } = data;
    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, this.configService.get<string>('JWT_REFRESH_SECRET')) as { userId: string };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    const user = await this.prisma.user.findUnique({ where: { id: decoded.userId }, include: { role: true } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    await this.securityService.invalidateSession(refreshToken);
    const tokens = this.generateTokens(user);
    await this.securityService.createSession(user.id, tokens.refreshToken, ipAddress, userAgent);
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role?.name || 'USER',
        companyId: user.companyId,
      },
    };
  }

  private generateTokens(user: User) {
    const payload = { userId: user.id, roleId: user.roleId, type: 'access' };
    const refreshPayload = { userId: user.id, roleId: user.roleId, type: 'refresh' };
    const accessToken = jwt.sign(payload, this.configService.get<string>('JWT_SECRET'), {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '15m'),
    });
    const refreshToken = jwt.sign(refreshPayload, this.configService.get<string>('JWT_REFRESH_SECRET'), {
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    });
    return { accessToken, refreshToken };
  }

  async requestPasswordReset(dto: RequestPasswordResetDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new BadRequestException('User not found');
    const token = randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
    await this.prisma.user.update({
      where: { id: user.id },
      data: { resetToken: token, resetTokenExpiry: expiry },
    });
    const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;
    await this.mailerService.sendMail(user.email, 'Password Reset', `Reset your password: ${resetUrl}`);
    return { message: 'Password reset email sent' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    if (dto.newPassword !== dto.confirmPassword) throw new BadRequestException('Passwords do not match');
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: dto.token,
        resetTokenExpiry: { gt: new Date() },
      },
    });
    if (!user) throw new BadRequestException('Invalid or expired token');
    const hashed = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashed, resetToken: null, resetTokenExpiry: null, lastPasswordChange: new Date() },
    });
    return { message: 'Password has been reset' };
  }

  async requestEmailVerification(dto: RequestEmailVerificationDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new BadRequestException('User not found');
    if (user.emailVerified) throw new BadRequestException('Email already verified');
    const token = randomBytes(32).toString('hex');
    await this.prisma.user.update({
      where: { id: user.id },
      data: { emailVerificationToken: token },
    });
    const verifyUrl = `${this.configService.get('FRONTEND_URL')}/verify-email?token=${token}`;
    await this.mailerService.sendMail(user.email, 'Verify Email', `Verify your email: ${verifyUrl}`);
    return { message: 'Verification email sent' };
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        emailVerificationToken: dto.token,
      },
    });
    if (!user) throw new BadRequestException('Invalid or expired token');
    await this.prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, emailVerificationToken: null },
    });
    return { message: 'Email verified successfully' };
  }
} 