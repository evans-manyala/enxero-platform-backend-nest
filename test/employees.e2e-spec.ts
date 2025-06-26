import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

describe('Employees E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let server: ReturnType<INestApplication['getHttpServer']>;
  let employeeId: string;
  let companyId: string;
  const email = `testemp-${String(uuidv4()).slice(0, 8)}@test.com`;
  const empId = `EMP${String(uuidv4()).slice(0, 8)}`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
    server = app.getHttpServer();
    prisma = app.get(PrismaService) as unknown as PrismaService;

    // Create a company for foreign key
    const company: { id: string } = await (prisma.company.create({
      data: {
        name: 'Employee Test Company',
        identifier: String(uuidv4()).slice(0, 20),
      },
    }) as Promise<{ id: string }>);
    companyId = company.id;
  });

  afterAll(async () => {
    await (prisma.employee.deleteMany({}) as Promise<unknown>);
    await (prisma.company.deleteMany({}) as Promise<unknown>);
    await app.close();
  });

  describe('Employee CRUD', () => {
    it('should create an employee', async () => {
      const res = await request(server)
        .post('/employees')
        .send({
          employeeId: empId,
          firstName: 'John',
          lastName: 'Doe',
          email,
          phoneNumber: '1234567890',
          department: 'Engineering',
          position: 'Developer',
          status: 'active',
          hireDate: '2023-01-01',
          salary: 50000,
          companyId,
          emergencyContact: { name: 'Jane Doe', phone: '9876543210' },
          address: { street: '123 Main St' },
          bankDetails: { account: '123456' },
          taxInfo: { tin: 'A12345' },
          benefits: { health: true },
        })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      employeeId = res.body.id;
    });

    it('should get all employees', async () => {
      const res = await request(server).get('/employees').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get one employee', async () => {
      const res = await request(server).get(`/employees/${employeeId}`).expect(200);
      expect(res.body).toHaveProperty('id', employeeId);
    });

    it('should update an employee', async () => {
      const res = await request(server)
        .put(`/employees/${employeeId}`)
        .send({ lastName: 'Smith', address: { street: '456 New St' } })
        .expect(200);
      expect(res.body).toHaveProperty('lastName', 'Smith');
      expect(res.body.address).toHaveProperty('street', '456 New St');
    });

    it('should not update non-existent employee', async () => {
      await request(server)
        .put(`/employees/${String(uuidv4())}`)
        .send({ firstName: 'Nope' })
        .expect(404);
    });

    it('should not create duplicate email/employeeId', async () => {
      await request(server)
        .post('/employees')
        .send({
          employeeId: empId,
          firstName: 'Jane',
          lastName: 'Doe',
          email,
          department: 'Engineering',
          position: 'Developer',
          status: 'active',
          hireDate: '2023-01-01',
          salary: 50000,
          companyId,
        })
        .expect(400);
    });

    it('should delete an employee', async () => {
      await request(server).delete(`/employees/${employeeId}`).expect(200);
    });

    it('should 404 on get deleted employee', async () => {
      await request(server).get(`/employees/${employeeId}`).expect(404);
    });
  });

  describe('Employee validation edge cases', () => {
    it('should 400 on missing required fields', async () => {
      await request(server)
        .post('/employees')
        .send({})
        .expect(400);
    });
    it('should 400 on too-long fields', async () => {
      await request(server)
        .post('/employees')
        .send({
          employeeId: 'a'.repeat(51),
          firstName: 'b'.repeat(101),
          lastName: 'c'.repeat(101),
          email: 'd'.repeat(256) + '@test.com',
          phoneNumber: 'e'.repeat(21),
          department: 'f'.repeat(101),
          position: 'g'.repeat(101),
          status: 'h'.repeat(51),
          hireDate: '2023-01-01',
          salary: 50000,
          companyId,
        })
        .expect(400);
    });
    it('should 400 on invalid types', async () => {
      await request(server)
        .post('/employees')
        .send({
          employeeId: 123,
          firstName: {},
          lastName: [],
          email: 456,
          phoneNumber: {},
          department: [],
          position: 789,
          status: {},
          hireDate: 123,
          salary: 'not-a-number',
          companyId,
          emergencyContact: 'not-an-object',
          address: 123,
          bankDetails: 'not-an-object',
          taxInfo: [],
          benefits: 'not-an-object',
        })
        .expect(400);
    });
    it('should 400 on extra/unknown fields', async () => {
      await request(server)
        .post('/employees')
        .send({
          employeeId: 'EMPX',
          firstName: 'Extra',
          lastName: 'Field',
          email: 'extrafield@test.com',
          department: 'Engineering',
          position: 'Developer',
          status: 'active',
          hireDate: '2023-01-01',
          salary: 50000,
          companyId,
          extra: 'field',
        })
        .expect(400);
    });
    it('should 400 if object fields are not objects', async () => {
      await request(server)
        .post('/employees')
        .send({
          employeeId: 'EMPY',
          firstName: 'Obj',
          lastName: 'Field',
          email: 'objfield@test.com',
          department: 'Engineering',
          position: 'Developer',
          status: 'active',
          hireDate: '2023-01-01',
          salary: 50000,
          companyId,
          emergencyContact: 'not-an-object',
          address: 123,
          bankDetails: 'not-an-object',
          taxInfo: [],
          benefits: 'not-an-object',
        })
        .expect(400);
    });
  });
}); 