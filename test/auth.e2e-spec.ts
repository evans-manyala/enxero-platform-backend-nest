import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth Module (e2e)', () => {
  let app: INestApplication;
  let companyId: string;
  let uniqueSuffix = Date.now();
  const testUserBase = {
    email: `authtest+${uniqueSuffix}@example.com`,
    username: `authtest${uniqueSuffix}`,
    password: 'TestPass123!',
    firstName: 'Auth',
    lastName: 'Test',
  };
  let accessToken: string;
  let refreshToken: string;

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

  it('should register a user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ ...testUserBase, ipAddress: '127.0.0.1', userAgent: 'jest' })
      .expect(201);
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
    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  it('should refresh token', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken, ipAddress: '127.0.0.1', userAgent: 'jest' })
      .expect(201);
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
}); 