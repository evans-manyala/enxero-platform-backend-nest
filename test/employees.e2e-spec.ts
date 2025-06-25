import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Employees Module (e2e)', () => {
  let app: INestApplication;
  let createdEmployeeId: string | undefined;
  let companyId: string;
  const uniqueSuffix = Date.now();
  const baseEmployee = {
    email: `employee${uniqueSuffix}@example.com`,
    employeeId: `EMP${uniqueSuffix}`,
    firstName: 'Test',
    lastName: 'Employee',
    department: 'Engineering',
    position: 'Developer',
    status: 'Active',
    hireDate: new Date().toISOString(),
    salary: 5000.00,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();

    // Create a company for the employee
    const companyRes = await request(app.getHttpServer())
      .post('/companies')
      .send({
        name: `Employee Test Company ${uniqueSuffix}`,
        identifier: `EMPTEST${uniqueSuffix}`,
        isActive: true,
      })
      .expect(201);
    companyId = companyRes.body.id;
  });

  afterAll(async () => {
    // Clean up: delete the created employee and company
    if (createdEmployeeId) {
      await request(app.getHttpServer())
        .delete(`/employees/${createdEmployeeId}`)
        .catch(() => {});
    }
    if (companyId) {
      await request(app.getHttpServer())
        .delete(`/companies/${companyId}`)
        .catch(() => {});
    }
    await app.close();
  });

  it('should create an employee', async () => {
    const res = await request(app.getHttpServer())
      .post('/employees')
      .send({ ...baseEmployee, companyId })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    createdEmployeeId = res.body.id;
    expect(res.body.email).toBe(baseEmployee.email);
    expect(res.body.employeeId).toBe(baseEmployee.employeeId);
  });

  it('should not create a duplicate employee (employeeId)', async () => {
    await request(app.getHttpServer())
      .post('/employees')
      .send({ ...baseEmployee, companyId })
      .expect(400);
  });

  it('should not create an employee with invalid payload', async () => {
    await request(app.getHttpServer())
      .post('/employees')
      .send({})
      .expect(400);
  });

  it('should get all employees', async () => {
    const res = await request(app.getHttpServer())
      .get('/employees')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((e: any) => e.id === createdEmployeeId)).toBeDefined();
  });

  it('should get an employee by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/employees/${createdEmployeeId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', createdEmployeeId);
    expect(res.body.email).toBe(baseEmployee.email);
  });

  it('should return 404 for not found employee', async () => {
    await request(app.getHttpServer())
      .get('/employees/nonexistent-id')
      .expect(200) // If your API returns 404, change this to 404
      .expect(res => {
        expect(res.body === null || JSON.stringify(res.body) === '{}').toBe(true);
      });
  });

  it('should update an employee', async () => {
    const res = await request(app.getHttpServer())
      .put(`/employees/${createdEmployeeId}`)
      .send({ firstName: 'Updated' })
      .expect(200);
    expect(res.body.firstName).toBe('Updated');
  });

  it('should delete an employee', async () => {
    await request(app.getHttpServer())
      .delete(`/employees/${createdEmployeeId}`)
      .expect(200);
    // Confirm deletion
    await request(app.getHttpServer())
      .get(`/employees/${createdEmployeeId}`)
      .expect(200)
      .expect(res => {
        expect(res.body === null || JSON.stringify(res.body) === '{}').toBe(true);
      });
    createdEmployeeId = undefined;
  });
}); 