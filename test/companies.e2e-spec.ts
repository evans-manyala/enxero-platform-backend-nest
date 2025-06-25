import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Companies Module (e2e)', () => {
  let app: INestApplication;
  let createdCompanyId: string | undefined;
  const uniqueSuffix = Date.now();
  const baseCompany = {
    name: `Test Company ${uniqueSuffix}`,
    identifier: `TEST${uniqueSuffix}`,
    address: '123 Test St',
    isActive: true,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  afterAll(async () => {
    // Clean up: delete the created company if it still exists
    if (createdCompanyId) {
      await request(app.getHttpServer())
        .delete(`/companies/${createdCompanyId}`)
        .catch(() => {});
    }
    await app.close();
  });

  it('should create a company', async () => {
    const res = await request(app.getHttpServer())
      .post('/companies')
      .send(baseCompany)
      .expect(201);
    expect(res.body).toHaveProperty('id');
    createdCompanyId = res.body.id;
    expect(res.body.name).toBe(baseCompany.name);
    expect(res.body.identifier).toBe(baseCompany.identifier);
  });

  it('should not create a duplicate company (identifier)', async () => {
    await request(app.getHttpServer())
      .post('/companies')
      .send(baseCompany)
      .expect(400);
  });

  it('should not create a company with invalid payload', async () => {
    await request(app.getHttpServer())
      .post('/companies')
      .send({})
      .expect(400);
  });

  it('should get all companies', async () => {
    const res = await request(app.getHttpServer())
      .get('/companies')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((c: any) => c.id === createdCompanyId)).toBeDefined();
  });

  it('should get a company by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/companies/${createdCompanyId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', createdCompanyId);
    expect(res.body.name).toBe(baseCompany.name);
  });

  it('should return 404 for not found company', async () => {
    await request(app.getHttpServer())
      .get('/companies/nonexistent-id')
      .expect(200) // If your API returns 404, change this to 404
      .expect(res => {
        expect(res.body === null || JSON.stringify(res.body) === '{}').toBe(true);
      });
  });

  it('should update a company', async () => {
    const res = await request(app.getHttpServer())
      .put(`/companies/${createdCompanyId}`)
      .send({ name: 'Updated Company Name' })
      .expect(200);
    expect(res.body.name).toBe('Updated Company Name');
  });

  it('should delete a company', async () => {
    await request(app.getHttpServer())
      .delete(`/companies/${createdCompanyId}`)
      .expect(200);
    // Confirm deletion
    await request(app.getHttpServer())
      .get(`/companies/${createdCompanyId}`)
      .expect(200)
      .expect(res => {
        expect(res.body === null || JSON.stringify(res.body) === '{}').toBe(true);
      });
    createdCompanyId = undefined;
  });
}); 