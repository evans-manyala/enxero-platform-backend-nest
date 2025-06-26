import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

describe('System E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let server: any;
  let configId: string;
  let logId: string;
  const configKey = `test_key_${uuidv4().slice(0, 8)}`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
    server = app.getHttpServer();
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.systemLog.deleteMany({});
    await prisma.systemConfig.deleteMany({});
    await app.close();
  });

  describe('SystemConfig CRUD', () => {
    it('should create a system config', async () => {
      const res = await request(server)
        .post('/system/configs')
        .send({
          key: configKey,
          value: { foo: 'bar' },
          description: 'Test config',
          isActive: true,
        })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      configId = res.body.id;
    });

    it('should get all system configs', async () => {
      const res = await request(server).get('/system/configs').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get one system config', async () => {
      const res = await request(server).get(`/system/configs/${configId}`).expect(200);
      expect(res.body).toHaveProperty('id', configId);
    });

    it('should update a system config', async () => {
      const res = await request(server)
        .put(`/system/configs/${configId}`)
        .send({ description: 'Updated config' })
        .expect(200);
      expect(res.body).toHaveProperty('description', 'Updated config');
    });

    it('should not update non-existent config', async () => {
      await request(server)
        .put(`/system/configs/${uuidv4()}`)
        .send({ description: 'Nope' })
        .expect(404);
    });

    it('should not create duplicate config key', async () => {
      await request(server)
        .post('/system/configs')
        .send({
          key: configKey,
          value: { foo: 'bar' },
          description: 'Duplicate',
          isActive: true,
        })
        .expect(409);
    });

    it('should delete a system config', async () => {
      await request(server).delete(`/system/configs/${configId}`).expect(200);
    });

    it('should 404 on get deleted config', async () => {
      await request(server).get(`/system/configs/${configId}`).expect(404);
    });
  });

  describe('SystemConfig validation edge cases', () => {
    it('should 400 on missing required fields', async () => {
      await request(server)
        .post('/system/configs')
        .send({})
        .expect(400);
    });
    it('should 400 on too-long fields', async () => {
      await request(server)
        .post('/system/configs')
        .send({
          key: 'a'.repeat(101),
          value: {},
          description: 'b'.repeat(256),
          isActive: true,
        })
        .expect(400);
    });
    it('should 400 on invalid types', async () => {
      await request(server)
        .post('/system/configs')
        .send({
          key: 123,
          value: 'not-an-object',
          description: {},
          isActive: 'yes',
        })
        .expect(400);
    });
    it('should 400 on extra/unknown fields', async () => {
      await request(server)
        .post('/system/configs')
        .send({
          key: 'extra_key',
          value: {},
          description: 'desc',
          isActive: true,
          extra: 'field',
        })
        .expect(400);
    });
  });

  describe('SystemLog CRUD', () => {
    it('should create a system log', async () => {
      const res = await request(server)
        .post('/system/logs')
        .send({
          level: 'info',
          message: 'Test log',
          metadata: { foo: 'bar' },
        })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      logId = res.body.id;
    });

    it('should get all system logs', async () => {
      const res = await request(server).get('/system/logs').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get one system log', async () => {
      const res = await request(server).get(`/system/logs/${logId}`).expect(200);
      expect(res.body).toHaveProperty('id', logId);
    });

    it('should update a system log', async () => {
      const res = await request(server)
        .put(`/system/logs/${logId}`)
        .send({ message: 'Updated log' })
        .expect(200);
      expect(res.body).toHaveProperty('message', 'Updated log');
    });

    it('should not update non-existent log', async () => {
      await request(server)
        .put(`/system/logs/${uuidv4()}`)
        .send({ message: 'Nope' })
        .expect(404);
    });

    it('should delete a system log', async () => {
      await request(server).delete(`/system/logs/${logId}`).expect(200);
    });

    it('should 404 on get deleted log', async () => {
      await request(server).get(`/system/logs/${logId}`).expect(404);
    });
  });

  describe('SystemLog validation edge cases', () => {
    it('should 400 on missing required fields', async () => {
      await request(server)
        .post('/system/logs')
        .send({})
        .expect(400);
    });
    it('should 400 on too-long fields', async () => {
      await request(server)
        .post('/system/logs')
        .send({
          level: 'a'.repeat(21),
          message: 'b'.repeat(501),
          metadata: {},
        })
        .expect(400);
    });
    it('should 400 on invalid types', async () => {
      await request(server)
        .post('/system/logs')
        .send({
          level: 123,
          message: {},
          metadata: 'not-an-object',
        })
        .expect(400);
    });
    it('should 400 on extra/unknown fields', async () => {
      await request(server)
        .post('/system/logs')
        .send({
          level: 'info',
          message: 'Valid',
          metadata: {},
          extra: 'field',
        })
        .expect(400);
    });
  });
}); 