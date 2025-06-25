import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await (this.$connect as () => Promise<void>).call(this);
  }

  enableShutdownHooks(app: INestApplication) {
    // @ts-expect-error Prisma event typing
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}