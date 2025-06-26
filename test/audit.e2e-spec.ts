import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

describe('Audit E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let server: any;
  let userId: string;
  let logId: string;
  let companyId: string;

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
        name: 'Audit Test Company',
        identifier: uuidv4().slice(0, 20),
      },
    });
    companyId = company.id;

    // Create a user for foreign key
    const user = await prisma.user.create({
      data: {
        username: 'audituser',
        email: `audituser-${uuidv4()}@test.com`,
        password: 'Password123!',
        firstName: 'Audit',
        lastName: 'User',
        companyId,
      },
    });
    userId = user.id;
  });

  afterAll(async () => {
    await prisma.audit_logs.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.company.deleteMany({});
    await app.close();
  });

  describe('AuditLog CRUD', () => {
    it('should create an audit log', async () => {
      const res = await request(server)
        .post('/audit')
        .send({
          action: 'CREATE',
          entityType: 'TestEntity',
          entityId: uuidv4(),
          userId,
          metadata: { foo: 'bar' },
        })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      logId = res.body.id;
    });

    it('should get all audit logs', async () => {
      const res = await request(server).get('/audit').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get one audit log', async () => {
      const res = await request(server).get(`/audit/${logId}`).expect(200);
      expect(res.body).toHaveProperty('id', logId);
    });

    it('should update an audit log', async () => {
      const res = await request(server)
        .put(`/audit/${logId}`)
        .send({ action: 'UPDATE' })
        .expect(200);
      expect(res.body).toHaveProperty('action', 'UPDATE');
    });

    it('should not update non-existent audit log', async () => {
      await request(server)
        .put(`/audit/${uuidv4()}`)
        .send({ action: 'Nope' })
        .expect(404);
    });

    it('should delete an audit log', async () => {
      await request(server).delete(`/audit/${logId}`).expect(200);
    });

    it('should 404 on get deleted audit log', async () => {
      await request(server).get(`/audit/${logId}`).expect(404);
    });
  });

  describe('AuditLog validation edge cases', () => {
    it('should 400 on missing required fields', async () => {
      await request(server)
        .post('/audit')
        .send({})
        .expect(400);
    });
    it('should 400 on too-long fields', async () => {
      await request(server)
        .post('/audit')
        .send({
          action: 'a'.repeat(101),
          entityType: 'b'.repeat(101),
          entityId: 'c'.repeat(101),
          userId,
          metadata: {},
        })
        .expect(400);
    });
    it('should 400 on invalid types', async () => {
      await request(server)
        .post('/audit')
        .send({
          action: 123,
          entityType: {},
          entityId: [],
          userId: 123,
          metadata: 'not-an-object',
        })
        .expect(400);
    });
    it('should 400 on extra/unknown fields', async () => {
      await request(server)
        .post('/audit')
        .send({
          action: 'Valid',
          entityType: 'TestEntity',
          entityId: uuidv4(),
          userId,
          metadata: {},
          extra: 'field',
        })
        .expect(400);
    });
    it('should 404 on log for non-existent user', async () => {
      await request(server)
        .post('/audit')
        .send({
          action: 'Valid',
          entityType: 'TestEntity',
          entityId: uuidv4(),
          userId: uuidv4(),
          metadata: {},
        })
        .expect(404);
    });
  });
}); 