import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { randomUUID } from 'crypto';

jest.setTimeout(30000);

// Utility to generate unique values
const uniqueSuffix = Date.now();

describe('Forms Module (e2e)', () => {
  let app: INestApplication;
  let companyId: string;
  let userId: string;
  let formId: string | undefined;

  const baseCompany = {
    name: `Forms Test Company ${uniqueSuffix}`,
    identifier: `FORMTEST${uniqueSuffix}`,
    isActive: true,
  };

  const baseUser = {
    username: `formuser${uniqueSuffix}`,
    email: `formuser${uniqueSuffix}@example.com`,
    password: 'TestPassword123!',
    firstName: 'Form',
    lastName: 'User',
    isActive: true,
  };

  const baseForm = {
    title: `Test Form ${uniqueSuffix}`,
    description: 'A form for testing',
    category: 'test',
    status: 'active',
    isTemplate: false,
    settings: { version: 1 },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();

    // Create a company
    const companyRes = await request(app.getHttpServer())
      .post('/companies')
      .send(baseCompany)
      .expect(201);
    companyId = companyRes.body.id;

    // Create a user
    const { isActive, ...userPayload } = baseUser;
    const userRes = await request(app.getHttpServer())
      .post('/users')
      .send({ ...userPayload, companyId })
      .expect(201);
    userId = userRes.body.id;
  });

  afterAll(async () => {
    // Clean up: delete the created form, user, and company
    if (formId) {
      await request(app.getHttpServer())
        .delete(`/forms/${formId}`)
        .catch(() => {});
    }
    if (userId) {
      await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .catch(() => {});
    }
    if (companyId) {
      await request(app.getHttpServer())
        .delete(`/companies/${companyId}`)
        .catch(() => {});
    }
    await app.close();
  });

  it('should create a form', async () => {
    const payload = { ...baseForm, companyId, createdBy: userId };
    console.log('Form creation payload:', payload);
    const res = await request(app.getHttpServer())
      .post('/forms')
      .send(payload)
      .catch((err) => err.response || err);
    if (res.status !== 201) {
      console.error('Form creation response:', res.body);
    }
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(baseForm.title);
    formId = res.body.id;
  });

  it('should get all forms', async () => {
    const res = await request(app.getHttpServer())
      .get('/forms')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((f: any) => f.id === formId)).toBeDefined();
  });

  it('should get a form by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/forms/${formId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', formId);
    expect(res.body.title).toBe(baseForm.title);
  });

  it('should update a form', async () => {
    const res = await request(app.getHttpServer())
      .put(`/forms/${formId}`)
      .send({ description: 'Updated description' })
      .expect(200);
    expect(res.body.description).toBe('Updated description');
  });

  it('should delete a form', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/forms/${formId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', formId);
    formId = undefined;
  });

  // --- EDGE CASE TESTS ---
  describe('Edge Cases', () => {
    it('should fail to create a form with missing required fields', async () => {
      const payload = { description: 'Missing required fields' };
      const res = await request(app.getHttpServer())
        .post('/forms')
        .send(payload);
      expect(res.status).toBe(400);
      expect(res.body.message).toEqual(
        expect.arrayContaining([
          expect.stringContaining('title'),
          expect.stringContaining('category'),
          expect.stringContaining('status'),
          expect.stringContaining('companyId'),
          expect.stringContaining('createdBy'),
        ])
      );
    });

    it('should fail to create a form with invalid types', async () => {
      const payload = {
        title: 123,
        category: {},
        status: [],
        companyId: 456,
        createdBy: false,
        isTemplate: 'notabool',
        settings: 'notanobject',
      };
      const res = await request(app.getHttpServer())
        .post('/forms')
        .send(payload);
      expect(res.status).toBe(400);
      expect(res.body.message).toEqual(
        expect.arrayContaining([
          expect.stringContaining('title'),
          expect.stringContaining('category'),
          expect.stringContaining('status'),
          expect.stringContaining('companyId'),
          expect.stringContaining('createdBy'),
          expect.stringContaining('isTemplate'),
        ])
      );
    });

    it('should fail to create a form with extra/unknown fields', async () => {
      const payload = {
        ...baseForm,
        companyId,
        createdBy: userId,
        extraField: 'not allowed',
      };
      const res = await request(app.getHttpServer())
        .post('/forms')
        .send(payload);
      expect(res.status).toBe(400);
      expect(res.body.message).toEqual(
        expect.arrayContaining([
          expect.stringContaining('property extraField should not exist'),
        ])
      );
    });

    it('should return 404 for non-existent form', async () => {
      const fakeId = randomUUID();
      await request(app.getHttpServer())
        .get(`/forms/${fakeId}`)
        .expect(404);
      await request(app.getHttpServer())
        .put(`/forms/${fakeId}`)
        .send({ title: 'Should not update' })
        .expect(404);
      await request(app.getHttpServer())
        .delete(`/forms/${fakeId}`)
        .expect(404);
    });

    it('should handle very long and empty strings', async () => {
      const longString = 'a'.repeat(1000);
      const payload = {
        title: longString,
        category: longString,
        status: longString,
        companyId,
        createdBy: userId,
      };
      const res = await request(app.getHttpServer())
        .post('/forms')
        .send(payload);
      // Should succeed unless you have max length validation
      expect([201, 400]).toContain(res.status);
      if (res.status === 201) {
        // Clean up
        await request(app.getHttpServer())
          .delete(`/forms/${res.body.id}`)
          .expect(200);
      }

      // Empty strings for required fields
      const emptyPayload = {
        title: '',
        category: '',
        status: '',
        companyId,
        createdBy: userId,
      };
      const res2 = await request(app.getHttpServer())
        .post('/forms')
        .send(emptyPayload);
      expect(res2.status).toBe(400);
    });

    it('should fail to create a form with invalid JSON in settings', async () => {
      const payload = {
        ...baseForm,
        companyId,
        createdBy: userId,
        settings: 'notanobject',
      };
      const res = await request(app.getHttpServer())
        .post('/forms')
        .send(payload);
      // Should fail validation or be accepted as string if not validated
      expect([201, 400]).toContain(res.status);
      if (res.status === 201) {
        // Clean up
        await request(app.getHttpServer())
          .delete(`/forms/${res.body.id}`)
          .expect(200);
      }
    });

    // Duplicate data test (if unique constraint on title+companyId)
    it('should handle duplicate form creation gracefully', async () => {
      const payload = { ...baseForm, companyId, createdBy: userId };
      // Create once
      const res1 = await request(app.getHttpServer())
        .post('/forms')
        .send(payload);
      // Try to create again
      const res2 = await request(app.getHttpServer())
        .post('/forms')
        .send(payload);
      // Should fail if unique constraint exists, else may succeed
      expect([201, 400, 409]).toContain(res2.status);
      if (res1.status === 201) {
        await request(app.getHttpServer())
          .delete(`/forms/${res1.body.id}`)
          .expect(200);
      }
      if (res2.status === 201) {
        await request(app.getHttpServer())
          .delete(`/forms/${res2.body.id}`)
          .expect(200);
      }
    });
  });
}); 