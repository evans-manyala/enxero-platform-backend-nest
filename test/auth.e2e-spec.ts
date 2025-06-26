import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth Module (e2e)', () => {
  let app: INestApplication;
  let companyId: string;
  const uniqueSuffix = Date.now();
  const testUserBase = {
    email: `authtest+${uniqueSuffix}@example.com`,
    username: `authtest${uniqueSuffix}`,
    password: 'TestPass123!',
    firstName: 'Auth',
    lastName: 'Test',
  };
  let refreshToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
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

    // Create a default role for registration
    const roleRes = await request(app.getHttpServer())
      .post('/roles')
      .send({
        name: 'USER',
        description: 'Default user role',
        permissions: [],
        isActive: true,
      });
    if (roleRes.status !== 201) {
      console.error('Role creation error:', roleRes.body);
    } else {
      console.log('Role creation response:', roleRes.body);
    }
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

  it('should register a user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ ...testUserBase, ipAddress: '127.0.0.1', userAgent: 'jest' });
    if (res.status !== 201) {
      console.error('Register error:', res.body);
    }
    expect(res.status).toBe(201);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.email).toBe(testUserBase.email);
  });

  it('should login', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: testUserBase.email, password: testUserBase.password, ipAddress: '127.0.0.1', userAgent: 'jest' })
      .expect(201);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
    refreshToken = res.body.refreshToken;
  });

  it('should refresh token', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken, ipAddress: '127.0.0.1', userAgent: 'jest' });
    console.log('Refresh token response:', res.status, res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
  });

  it('should request password reset', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/request-password-reset')
      .send({ email: testUserBase.email })
      .expect(201);
    expect(res.body.message).toMatch(/reset email sent/i);
    // Simulate fetching the reset token from DB (in real test, query DB or mock)
    // Here, just check endpoint works
  });

  it('should request email verification', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/request-email-verification')
      .send({ email: testUserBase.email })
      .expect(201);
    expect(res.body.message).toMatch(/verification email sent/i);
    // Simulate fetching the verification token from DB (in real test, query DB or mock)
    // Here, just check endpoint works
  });

  // --- EDGE CASE TESTS ---
  it('should fail to register with empty required fields', async () => {
    const payload = { email: '', username: '', password: '', firstName: '', lastName: '' };
    const res = await request(app.getHttpServer())
      .post('/auth/register')
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

  it('should fail to register with too-long fields', async () => {
    const payload = {
      email: 'a'.repeat(250) + '@example.com',
      username: 'b'.repeat(51),
      password: 'c'.repeat(256),
      firstName: 'd'.repeat(101),
      lastName: 'e'.repeat(101),
    };
    const res = await request(app.getHttpServer())
      .post('/auth/register')
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

  it('should fail to register with invalid email', async () => {
    const payload = { ...testUserBase, email: 'not-an-email' };
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('email'),
      ])
    );
  });

  it('should fail to register with short password', async () => {
    const payload = { ...testUserBase, password: 'short' };
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('password'),
      ])
    );
  });

  it('should fail to register with extra/unknown fields', async () => {
    const payload = { ...testUserBase, extraField: 'not allowed' };
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('property extraField should not exist'),
      ])
    );
  });

  it('should fail to login with empty fields', async () => {
    const payload = { email: '', password: '' };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('email'),
        expect.stringContaining('password'),
      ])
    );
  });

  it('should fail to login with invalid email', async () => {
    const payload = { email: 'not-an-email', password: 'TestPass123!' };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('email'),
      ])
    );
  });

  it('should fail to login with short password', async () => {
    const payload = { email: testUserBase.email, password: 'short' };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('password'),
      ])
    );
  });

  it('should fail to login with extra/unknown fields', async () => {
    const payload = { email: testUserBase.email, password: testUserBase.password, extraField: 'not allowed' };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('property extraField should not exist'),
      ])
    );
  });

  it('should fail to login with invalid credentials', async () => {
    const payload = { email: testUserBase.email, password: 'WrongPassword123!' };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(payload);
    expect([400, 401]).toContain(res.status);
  });
}); 