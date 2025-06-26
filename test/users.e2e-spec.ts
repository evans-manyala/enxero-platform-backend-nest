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
      .expect(404);
  });

  // --- EDGE CASE TESTS ---
  it('should fail to create a user with empty required fields', async () => {
    const payload = { email: '', username: '', password: '', firstName: '', lastName: '', companyId };
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('email'),
        expect.stringContaining('username'),
        expect.stringContaining('password'),
        expect.stringContaining('firstName'),
        expect.stringContaining('lastName'),
      ])
    );
  });

  it('should fail to create a user with too-long fields', async () => {
    const payload = {
      email: 'a'.repeat(250) + '@example.com',
      username: 'b'.repeat(51),
      password: 'c'.repeat(256),
      firstName: 'd'.repeat(101),
      lastName: 'e'.repeat(101),
      phoneNumber: '1'.repeat(21),
      avatar: 'f'.repeat(256),
      companyId,
    };
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('email'),
        expect.stringContaining('username'),
        expect.stringContaining('password'),
        expect.stringContaining('firstName'),
        expect.stringContaining('lastName'),
        expect.stringContaining('phoneNumber'),
        expect.stringContaining('avatar'),
      ])
    );
  });

  it('should fail to create a user with invalid email', async () => {
    const payload = { ...testUserBase, email: 'not-an-email', companyId };
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('email'),
      ])
    );
  });

  it('should fail to create a user with short password', async () => {
    const payload = { ...testUserBase, password: 'short', companyId };
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('password'),
      ])
    );
  });

  it('should fail to create a user with extra/unknown fields', async () => {
    const payload = { ...testUserBase, companyId, extraField: 'not allowed' };
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('property extraField should not exist'),
      ])
    );
  });
}); 