import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserSession, UserActivity } from '@prisma/client';

@Injectable()
export class SecurityService {
  private readonly MAX_FAILED_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
  private readonly SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

  constructor(private readonly prisma: PrismaService) {}

  async trackFailedLoginAttempt(
    email: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) {
      await this.prisma.failedLoginAttempt.create({
        data: { email, ipAddress, userAgent, userId: user.id },
      });
      const recentAttempts = await this.prisma.failedLoginAttempt.count({
        where: {
          userId: user.id,
          createdAt: { gte: new Date(Date.now() - this.LOCKOUT_DURATION) },
        },
      });
      if (recentAttempts >= this.MAX_FAILED_ATTEMPTS) {
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            accountStatus: 'LOCKED',
            deactivatedAt: new Date(),
            deactivationReason: 'Too many failed login attempts',
          },
        });
      }
    }
  }

  async isAccountLocked(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { accountStatus: true, deactivatedAt: true },
    });
    if (!user) return false;
    if (user.accountStatus === 'LOCKED' && user.deactivatedAt) {
      const lockoutEnd = new Date(user.deactivatedAt.getTime() + this.LOCKOUT_DURATION);
      if (new Date() < lockoutEnd) {
        return true;
      } else {
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            accountStatus: 'ACTIVE',
            deactivatedAt: null,
            deactivationReason: null,
          },
        });
        return false;
      }
    }
    return false;
  }

  async createSession(
    userId: string,
    token: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<UserSession> {
    await this.prisma.userSession.deleteMany({ where: { token } });
    return this.prisma.userSession.create({
      data: {
        userId,
        token,
        ipAddress,
        userAgent,
        expiresAt: new Date(Date.now() + this.SESSION_EXPIRY),
      },
    });
  }
  getUserSessions(userId: string): Promise<UserSession[]> {
    return this.prisma.userSession.findMany({
      where: { userId, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async invalidateSession(token: string): Promise<void> {
    await this.prisma.userSession.delete({ where: { token } });
  }

  async invalidateAllSessions(userId: string): Promise<void> {
    await this.prisma.userSession.deleteMany({ where: { userId } });
  }

  trackActivity(
    userId: string,
    action: string,
    metadata?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string
  ): Promise<UserActivity> {
    return this.prisma.userActivity.create({
      data: { userId, action, metadata, ipAddress, userAgent },
    });
  }

  getUserActivities(userId: string, limit = 50, offset = 0): Promise<UserActivity[]> {
    return this.prisma.userActivity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  async cleanupOldRecords(): Promise<void> {
    const now = new Date();
    await this.prisma.userSession.deleteMany({ where: { expiresAt: { lt: now } } });
    await this.prisma.failedLoginAttempt.deleteMany({
      where: {
        createdAt: { lt: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async createUserSession(data: { userId: string; token: string; ipAddress?: string; userAgent?: string }): Promise<UserSession> {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    return this.prisma.userSession.create({ data: { ...data, expiresAt } });
  }

  async deleteUserSessionsByToken(token: string): Promise<void> {
    await this.prisma.userSession.deleteMany({ where: { token } });
  }

  async createUserActivity(userId: string, action: string, metadata?: any, ipAddress?: string, userAgent?: string): Promise<UserActivity> {
    return this.prisma.userActivity.create({
      data: { userId, action, metadata, ipAddress, userAgent },
    });
  }
} 