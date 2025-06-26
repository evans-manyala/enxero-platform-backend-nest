import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Files Module (e2e)', () => {
  let app: INestApplication;
  let createdFileId: string | undefined;
  const uniqueSuffix = Date.now();
  const baseFile = {
    filename: `testfile${uniqueSuffix}.txt`,
    storageName: `storagefile${uniqueSuffix}.txt`,
    mimetype: 'text/plain',
    size: 1234,
    description: 'A test file',
    tags: ['test', 'file'],
    entityType: 'document',
    entityId: `entity${uniqueSuffix}`,
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
    // Clean up: delete the created file
    if (createdFileId) {
      await request(app.getHttpServer())
        .delete(`/files/${createdFileId}`)
        .catch(() => {});
    }
    await app.close();
  });

  it('should create a file', async () => {
    const res = await request(app.getHttpServer())
      .post('/files')
      .send(baseFile)
      .expect(201);
    expect(res.body).toHaveProperty('id');
    createdFileId = res.body.id;
    expect(res.body.filename).toBe(baseFile.filename);
  });

  it('should not create a file with invalid payload', async () => {
    await request(app.getHttpServer())
      .post('/files')
      .send({})
      .expect(400);
  });

  it('should get all files', async () => {
    const res = await request(app.getHttpServer())
      .get('/files')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((f: any) => f.id === createdFileId)).toBeDefined();
  });

  it('should get a file by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/files/${createdFileId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', createdFileId);
    expect(res.body.filename).toBe(baseFile.filename);
  });

  it('should return 404 for not found file', async () => {
    await request(app.getHttpServer())
      .get('/files/nonexistent-id')
      .expect(404);
  });

  it('should update a file', async () => {
    const res = await request(app.getHttpServer())
      .put(`/files/${createdFileId}`)
      .send({ description: 'Updated description' })
      .expect(200);
    expect(res.body.description).toBe('Updated description');
  });

  it('should delete a file', async () => {
    await request(app.getHttpServer())
      .delete(`/files/${createdFileId}`)
      .expect(200);
    // Confirm deletion
    await request(app.getHttpServer())
      .get(`/files/${createdFileId}`)
      .expect(404);
    createdFileId = undefined;
  });

  // --- EDGE CASE TESTS ---
  it('should fail to create a file with too-long fields', async () => {
    const payload = {
      ...baseFile,
      filename: 'a'.repeat(256),
      storageName: 'b'.repeat(256),
      mimetype: 'c'.repeat(256),
      description: 'd'.repeat(256),
      entityType: 'e'.repeat(51),
      entityId: 'f'.repeat(51),
      tags: ['g'.repeat(256)],
    };
    const res = await request(app.getHttpServer())
      .post('/files')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('filename'),
        expect.stringContaining('storageName'),
        expect.stringContaining('mimetype'),
        expect.stringContaining('description'),
        expect.stringContaining('entityType'),
        expect.stringContaining('entityId'),
        expect.stringContaining('tags'),
      ])
    );
  });

  it('should fail to create a file with extra/unknown fields', async () => {
    const payload = { ...baseFile, extraField: 'not allowed' };
    const res = await request(app.getHttpServer())
      .post('/files')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('property extraField should not exist'),
      ])
    );
  });

  it('should fail to create a file with invalid types', async () => {
    const payload = { ...baseFile, size: 'not-a-number', tags: [123] };
    const res = await request(app.getHttpServer())
      .post('/files')
      .send(payload);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('size'),
        expect.stringContaining('tags'),
      ])
    );
  });
}); 