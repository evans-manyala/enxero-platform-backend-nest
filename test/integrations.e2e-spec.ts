import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

describe('Integrations E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let server: any;
  let companyId: string;
  let integrationId: string;
  let logId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
    server = app.getHttpServer();
    prisma = app.get(PrismaService);

    // Create a company for foreign key
    const company = await prisma.company.create({
      data: {
        name: 'Test Company',
        identifier: uuidv4().slice(0, 20),
      },
    });
    companyId = company.id;
  });

  afterAll(async () => {
    await prisma.integrationLog.deleteMany({});
    await prisma.integration.deleteMany({});
    await prisma.company.deleteMany({});
    await app.close();
  });

  describe('Integration CRUD', () => {
    it('should create an integration', async () => {
      const res = await request(server)
        .post('/integrations')
        .send({
          name: 'Slack',
          type: 'chat',
          config: { webhook: 'https://example.com' },
          status: 'active',
          companyId,
        })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      integrationId = res.body.id;
    });

    it('should get all integrations', async () => {
      const res = await request(server).get('/integrations').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get one integration', async () => {
      const res = await request(server).get(`/integrations/${integrationId}`).expect(200);
      expect(res.body).toHaveProperty('id', integrationId);
    });

    it('should update an integration', async () => {
      const res = await request(server)
        .put(`/integrations/${integrationId}`)
        .send({ name: 'Slack Updated' })
        .expect(200);
      expect(res.body).toHaveProperty('name', 'Slack Updated');
    });

    it('should not update non-existent integration', async () => {
      await request(server)
        .put(`/integrations/${uuidv4()}`)
        .send({ name: 'Nope' })
        .expect(404);
    });

    it('should not create duplicate integration (name+companyId)', async () => {
      await request(server)
        .post('/integrations')
        .send({
          name: 'Slack Updated',
          type: 'chat',
          config: { webhook: 'https://example.com' },
          status: 'active',
          companyId,
        })
        .expect(409);
    });

    it('should delete an integration', async () => {
      await request(server).delete(`/integrations/${integrationId}`).expect(200);
    });

    it('should 404 on get deleted integration', async () => {
      await request(server).get(`/integrations/${integrationId}`).expect(404);
    });
  });

  describe('Integration validation edge cases', () => {
    it('should 400 on missing required fields', async () => {
      await request(server)
        .post('/integrations')
        .send({})
        .expect(400);
    });
    it('should 400 on too-long fields', async () => {
      await request(server)
        .post('/integrations')
        .send({
          name: 'a'.repeat(101),
          type: 'b'.repeat(51),
          config: {},
          status: 'c'.repeat(21),
          companyId,
        })
        .expect(400);
    });
    it('should 400 on invalid types', async () => {
      await request(server)
        .post('/integrations')
        .send({
          name: 123,
          type: {},
          config: 'not-an-object',
          status: [],
          companyId: 123,
        })
        .expect(400);
    });
    it('should 400 on extra/unknown fields', async () => {
      await request(server)
        .post('/integrations')
        .send({
          name: 'Valid',
          type: 'chat',
          config: {},
          status: 'active',
          companyId,
          extra: 'field',
        })
        .expect(400);
    });
  });

  describe('IntegrationLog CRUD', () => {
    beforeAll(async () => {
      // Re-create integration for log tests
      const integration = await prisma.integration.create({
        data: {
          name: 'LogTest',
          type: 'log',
          config: { foo: 'bar' },
          status: 'active',
          companyId,
        },
      });
      integrationId = integration.id;
    });
    afterAll(async () => {
      await prisma.integrationLog.deleteMany({});
      await prisma.integration.deleteMany({});
    });
    it('should create an integration log', async () => {
      const res = await request(server)
        .post('/integrations/logs')
        .send({
          integrationId,
          message: 'Log message',
          type: 'info',
          status: 'ok',
          data: { foo: 'bar' },
        })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      logId = res.body.id;
    });
    it('should get all integration logs', async () => {
      const res = await request(server).get('/integrations/logs');
      console.log('DEBUG logs response:', res.status, res.body);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
    it('should get one integration log', async () => {
      const res = await request(server).get(`/integrations/logs/${logId}`).expect(200);
      expect(res.body).toHaveProperty('id', logId);
    });
    it('should update an integration log', async () => {
      const res = await request(server)
        .put(`/integrations/logs/${logId}`)
        .send({ message: 'Updated log' })
        .expect(200);
      expect(res.body).toHaveProperty('message', 'Updated log');
    });
    it('should not update non-existent log', async () => {
      await request(server)
        .put(`/integrations/logs/${uuidv4()}`)
        .send({ message: 'Nope' })
        .expect(404);
    });
    it('should delete an integration log', async () => {
      await request(server).delete(`/integrations/logs/${logId}`).expect(200);
    });
    it('should 404 on get deleted log', async () => {
      await request(server).get(`/integrations/logs/${logId}`).expect(404);
    });
  });

  describe('IntegrationLog validation edge cases', () => {
    it('should 400 on missing required fields', async () => {
      await request(server)
        .post('/integrations/logs')
        .send({})
        .expect(400);
    });
    it('should 400 on too-long fields', async () => {
      await request(server)
        .post('/integrations/logs')
        .send({
          integrationId,
          message: 'a'.repeat(501),
          type: 'b'.repeat(51),
          status: 'c'.repeat(21),
          data: {},
        })
        .expect(400);
    });
    it('should 400 on invalid types', async () => {
      await request(server)
        .post('/integrations/logs')
        .send({
          integrationId: 123,
          message: {},
          type: [],
          status: {},
          data: 'not-an-object',
        })
        .expect(400);
    });
    it('should 400 on extra/unknown fields', async () => {
      await request(server)
        .post('/integrations/logs')
        .send({
          integrationId,
          message: 'Valid',
          type: 'info',
          status: 'ok',
          data: {},
          extra: 'field',
        })
        .expect(400);
    });
    it('should 404 on log for non-existent integration', async () => {
      await request(server)
        .post('/integrations/logs')
        .send({
          integrationId: uuidv4(),
          message: 'Valid',
          type: 'info',
          status: 'ok',
          data: {},
        })
        .expect(404);
    });
  });
}); 