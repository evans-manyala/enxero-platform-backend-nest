import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

describe('Companies E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let server: any;
  let companyId: string;
  const identifier = `testid-${uuidv4().slice(0, 8)}`;

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
    await prisma.company.deleteMany({});
    await app.close();
  });

  describe('Company CRUD', () => {
    it('should create a company', async () => {
      const res = await request(server)
        .post('/companies')
        .send({
          name: 'Test Company',
          identifier,
          fullName: 'Test Company Full',
          shortName: 'TCF',
          workPhone: '1234567890',
          city: 'Test City',
          address: { street: '123 Main St' },
          settings: { theme: 'dark' },
          isActive: true,
        })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      companyId = res.body.id;
    });

    it('should get all companies', async () => {
      const res = await request(server).get('/companies').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get one company', async () => {
      const res = await request(server).get(`/companies/${companyId}`).expect(200);
      expect(res.body).toHaveProperty('id', companyId);
    });

    it('should update a company', async () => {
      const res = await request(server)
        .put(`/companies/${companyId}`)
        .send({ shortName: 'UpdatedSN', address: { street: '456 New St' } })
        .expect(200);
      expect(res.body).toHaveProperty('shortName', 'UpdatedSN');
      expect(res.body.address).toHaveProperty('street', '456 New St');
    });

    it('should not update non-existent company', async () => {
      await request(server)
        .put(`/companies/${uuidv4()}`)
        .send({ name: 'Nope' })
        .expect(404);
    });

    it('should not create duplicate identifier', async () => {
      await request(server)
        .post('/companies')
        .send({
          name: 'Another Company',
          identifier,
        })
        .expect(400);
    });

    it('should delete a company', async () => {
      await request(server).delete(`/companies/${companyId}`).expect(200);
    });

    it('should 404 on get deleted company', async () => {
      await request(server).get(`/companies/${companyId}`).expect(404);
    });
  });

  describe('Company validation edge cases', () => {
    it('should 400 on missing required fields', async () => {
      await request(server)
        .post('/companies')
        .send({})
        .expect(400);
    });
    it('should 400 on too-long fields', async () => {
      await request(server)
        .post('/companies')
        .send({
          name: 'a'.repeat(256),
          identifier: 'b'.repeat(51),
          fullName: 'c'.repeat(256),
          shortName: 'd'.repeat(101),
          workPhone: 'e'.repeat(21),
          city: 'f'.repeat(101),
          address: {},
          settings: {},
        })
        .expect(400);
    });
    it('should 400 on invalid types', async () => {
      await request(server)
        .post('/companies')
        .send({
          name: 123,
          identifier: {},
          fullName: [],
          shortName: 456,
          workPhone: {},
          city: [],
          address: 'not-an-object',
          settings: 'not-an-object',
          isActive: 'yes',
        })
        .expect(400);
    });
    it('should 400 on extra/unknown fields', async () => {
      await request(server)
        .post('/companies')
        .send({
          name: 'Valid',
          address: {},
          settings: {},
          extra: 'field',
        })
        .expect(400);
    });
    it('should 400 if address/settings are not objects', async () => {
      await request(server)
        .post('/companies')
        .send({
          name: 'Valid',
          address: 'not-an-object',
          settings: 123,
        })
        .expect(400);
    });
  });
}); 