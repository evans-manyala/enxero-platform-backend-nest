import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Notifications Module (e2e)', () => {
  let app: INestApplication;
  let createdNotificationId: string | undefined;
  let companyId: string;
  let userId: string;
  const uniqueSuffix = Date.now();
  const baseCompany = {
    name: `Notification Test Company ${uniqueSuffix}`,
    identifier: `NOTIFTEST${uniqueSuffix}`,
    isActive: true,
  };
  const baseNotification = {
    title: 'Test Notification',
    message: 'This is a test notification.',
    type: 'info',
    category: 'general',
    isRead: false,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();

    // Create a company for notifications
    const companyRes = await request(app.getHttpServer())
      .post('/companies')
      .send(baseCompany)
      .expect(201);
    companyId = companyRes.body.id;

    // Create a user for notifications
    const userRes = await request(app.getHttpServer())
      .post('/users')
      .send({
        email: `notifuser${uniqueSuffix}@example.com`,
        username: `notifuser${uniqueSuffix}`,
        password: 'TestPass123!',
        firstName: 'Notif',
        lastName: 'User',
        companyId,
      })
      .expect(201);
    userId = userRes.body.id;
  });

  afterAll(async () => {
    // Clean up: delete the created notification and company
    if (createdNotificationId) {
      await request(app.getHttpServer())
        .delete(`/notifications/${createdNotificationId}`)
        .catch(() => {});
    }
    if (companyId) {
      await request(app.getHttpServer())
        .delete(`/companies/${companyId}`)
        .catch(() => {});
    }
    await app.close();
  });

  it('should create a notification', async () => {
    const res = await request(app.getHttpServer())
      .post('/notifications')
      .send({ ...baseNotification, companyId, userId })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    createdNotificationId = res.body.id;
    expect(res.body.title).toBe(baseNotification.title);
    expect(res.body.companyId).toBe(companyId);
    expect(res.body.userId).toBe(userId);
  });

  it('should not create a notification with invalid payload', async () => {
    await request(app.getHttpServer())
      .post('/notifications')
      .send({})
      .expect(400);
  });

  it('should get all notifications', async () => {
    const res = await request(app.getHttpServer())
      .get('/notifications')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((n: any) => n.id === createdNotificationId)).toBeDefined();
  });

  it('should get a notification by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/notifications/${createdNotificationId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', createdNotificationId);
    expect(res.body.title).toBe(baseNotification.title);
  });

  it('should return 404 for not found notification', async () => {
    await request(app.getHttpServer())
      .get('/notifications/nonexistent-id')
      .expect(404);
  });

  it('should update a notification', async () => {
    const res = await request(app.getHttpServer())
      .put(`/notifications/${createdNotificationId}`)
      .send({ message: 'Updated message' })
      .expect(200);
    expect(res.body.message).toBe('Updated message');
  });

  it('should delete a notification', async () => {
    await request(app.getHttpServer())
      .delete(`/notifications/${createdNotificationId}`)
      .expect(200);
    // Confirm deletion
    await request(app.getHttpServer())
      .get(`/notifications/${createdNotificationId}`)
      .expect(404);
    createdNotificationId = undefined;
  });

  // --- EDGE CASE TESTS ---
  it('should fail to create a notification with too-long fields', async () => {
    const payload = {
      ...baseNotification,
      title: 'a'.repeat(101),
      message: 'b'.repeat(501),
      type: 'c'.repeat(101),
      category: 'd'.repeat(101),
      userId: 'e'.repeat(51),
      companyId: 'f'.repeat(51),
    };
    const res = await request(app.getHttpServer())
      .post('/notifications')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('title'),
        expect.stringContaining('message'),
        expect.stringContaining('type'),
        expect.stringContaining('category'),
        expect.stringContaining('userId'),
        expect.stringContaining('companyId'),
      ])
    );
  });

  it('should fail to create a notification with extra/unknown fields', async () => {
    const payload = { ...baseNotification, companyId, userId, extraField: 'not allowed' };
    const res = await request(app.getHttpServer())
      .post('/notifications')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('property extraField should not exist'),
      ])
    );
  });

  it('should fail to create a notification with invalid types', async () => {
    const payload = { ...baseNotification, companyId, userId, isRead: 'not-a-boolean' };
    const res = await request(app.getHttpServer())
      .post('/notifications')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('isRead'),
      ])
    );
  });
}); 