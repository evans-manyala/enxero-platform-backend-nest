import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Roles Module (e2e)', () => {
  let app: INestApplication;
  let createdRoleId: string | undefined;
  const uniqueSuffix = Date.now();
  const baseRole = {
    name: `TestRole${uniqueSuffix}`,
    description: 'A test role',
    permissions: ['read:own', 'write:own'],
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
    // Clean up: delete the created role if it still exists
    if (createdRoleId) {
      await request(app.getHttpServer())
        .delete(`/roles/${createdRoleId}`)
        .catch(() => {});
    }
    await app.close();
  });

  it('should create a role', async () => {
    const res = await request(app.getHttpServer())
      .post('/roles')
      .send(baseRole)
      .expect(201);
    expect(res.body).toHaveProperty('id');
    createdRoleId = res.body.id;
    expect(res.body.name).toBe(baseRole.name);
    expect(res.body.description).toBe(baseRole.description);
  });

  it('should not create a duplicate role (name)', async () => {
    await request(app.getHttpServer())
      .post('/roles')
      .send(baseRole)
      .expect(400);
  });

  it('should not create a role with invalid payload', async () => {
    await request(app.getHttpServer())
      .post('/roles')
      .send({})
      .expect(400);
  });

  it('should get all roles', async () => {
    const res = await request(app.getHttpServer())
      .get('/roles')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((r: any) => r.id === createdRoleId)).toBeDefined();
  });

  it('should get a role by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/roles/${createdRoleId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', createdRoleId);
    expect(res.body.name).toBe(baseRole.name);
  });

  it('should return 404 for not found role', async () => {
    await request(app.getHttpServer())
      .get('/roles/nonexistent-id')
      .expect(404);
  });

  it('should update a role', async () => {
    const res = await request(app.getHttpServer())
      .put(`/roles/${createdRoleId}`)
      .send({ description: 'Updated description' })
      .expect(200);
    expect(res.body.description).toBe('Updated description');
  });

  it('should delete a role', async () => {
    await request(app.getHttpServer())
      .delete(`/roles/${createdRoleId}`)
      .expect(200);
    // Confirm deletion
    await request(app.getHttpServer())
      .get(`/roles/${createdRoleId}`)
      .expect(404);
    createdRoleId = undefined;
  });

  // --- EDGE CASE TESTS ---
  it('should fail to create a role with empty required fields', async () => {
    const payload = { name: '', permissions: [] };
    const res = await request(app.getHttpServer())
      .post('/roles')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('name'),
      ])
    );
  });

  it('should fail to create a role with too-long fields', async () => {
    const payload = {
      name: 'a'.repeat(101),
      description: 'b'.repeat(501),
      permissions: ['read:own'],
    };
    const res = await request(app.getHttpServer())
      .post('/roles')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('name'),
        expect.stringContaining('description'),
      ])
    );
  });

  it('should fail to create a role with extra/unknown fields', async () => {
    const payload = { ...baseRole, name: 'Extra Field Role', extraField: 'not allowed' };
    const res = await request(app.getHttpServer())
      .post('/roles')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('property extraField should not exist'),
      ])
    );
  });

  it('should fail to create a role with invalid permissions type', async () => {
    const payload = { name: 'Invalid Perms', permissions: 'not-an-array' };
    const res = await request(app.getHttpServer())
      .post('/roles')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('permissions'),
      ])
    );
  });
}); 