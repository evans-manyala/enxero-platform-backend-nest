import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Users Module (e2e)', () => {
  let app: INestApplication;
  let createdUserId: string;
  let companyId: string;
  const testUserBase = {
    email: 'testuser@example.com',
    username: 'testuser',
    password: 'TestPass123!',
    firstName: 'Test',
    lastName: 'User',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();

    // Create a company for testing
    const companyRes = await request(app.getHttpServer())
      .post('/companies')
      .send({
        name: 'Test Company',
        address: '123 Test St',
        isActive: true
      })
      .expect(201);
    companyId = companyRes.body.id;
  });

  afterAll(async () => {
    // Clean up: delete the created company
    if (companyId) {
      await request(app.getHttpServer())
        .delete(`/companies/${companyId}`)
        .expect(200);
    }
    await app.close();
  });

  it('should create a user', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send({ ...testUserBase, companyId })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    createdUserId = res.body.id;
    expect(res.body.email).toBe(testUserBase.email);
  });

  it('should get all users', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((u: any) => u.id === createdUserId)).toBeDefined();
  });

  it('should get a user by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/users/${createdUserId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', createdUserId);
  });

  it('should update a user', async () => {
    const res = await request(app.getHttpServer())
      .put(`/users/${createdUserId}`)
      .send({ firstName: 'Updated' })
      .expect(200);
    expect(res.body.firstName).toBe('Updated');
  });

  it('should delete a user', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${createdUserId}`)
      .expect(200);
    // Confirm deletion
    await request(app.getHttpServer())
      .get(`/users/${createdUserId}`)
      .expect(200)
      .expect(res => {
        expect(res.body === null || JSON.stringify(res.body) === '{}').toBe(true);
      });
  });
}); 