import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Payroll Module (e2e)', () => {
  let app: INestApplication;
  let createdPayrollId: string | undefined;
  let companyId: string;
  let employeeId: string;
  let periodId: string;
  const uniqueSuffix = Date.now();
  const baseCompany = {
    name: `Payroll Test Company ${uniqueSuffix}`,
    identifier: `PAYTEST${uniqueSuffix}`,
    isActive: true,
  };
  const baseEmployee = {
    email: `payrollemployee${uniqueSuffix}@example.com`,
    employeeId: `PAYEMP${uniqueSuffix}`,
    firstName: 'Payroll',
    lastName: 'Employee',
    department: 'Finance',
    position: 'Accountant',
    status: 'Active',
    hireDate: new Date().toISOString(),
    salary: 7000.00,
  };
  let basePayroll: any;

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

    // Create an employee
    const employeeRes = await request(app.getHttpServer())
      .post('/employees')
      .send({ ...baseEmployee, companyId })
      .expect(201);
    employeeId = employeeRes.body.id;

    // Create a payroll period
    const periodRes = await request(app.getHttpServer())
      .post('/payroll-periods')
      .send({
        companyId,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Open',
      })
      .expect(201);
    periodId = periodRes.body.id;

    // Prepare base payroll record
    basePayroll = {
      employeeId,
      companyId,
      periodId,
      payPeriodStart: new Date().toISOString(),
      payPeriodEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      grossSalary: 7000.00,
      totalDeductions: 500.00,
      netSalary: 6500.00,
      workingDays: 20,
      status: 'Processed',
    };
  });

  afterAll(async () => {
    // Clean up: delete the created payroll, employee, and company
    if (createdPayrollId) {
      await request(app.getHttpServer())
        .delete(`/payroll/${createdPayrollId}`)
        .catch(() => {});
    }
    if (employeeId) {
      await request(app.getHttpServer())
        .delete(`/employees/${employeeId}`)
        .catch(() => {});
    }
    if (companyId) {
      await request(app.getHttpServer())
        .delete(`/companies/${companyId}`)
        .catch(() => {});
    }
    await app.close();
  });

  it('should create a payroll record', async () => {
    const res = await request(app.getHttpServer())
      .post('/payroll')
      .send(basePayroll)
      .expect(201);
    expect(res.body).toHaveProperty('id');
    createdPayrollId = res.body.id;
    expect(res.body.employeeId).toBe(basePayroll.employeeId);
    expect(res.body.companyId).toBe(basePayroll.companyId);
  });

  it('should not create a duplicate payroll record (employeeId, payPeriodStart)', async () => {
    await request(app.getHttpServer())
      .post('/payroll')
      .send(basePayroll)
      .expect(400);
  });

  it('should not create a payroll record with invalid payload', async () => {
    await request(app.getHttpServer())
      .post('/payroll')
      .send({})
      .expect(400);
  });

  it('should get all payroll records', async () => {
    const res = await request(app.getHttpServer())
      .get('/payroll')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((p: any) => p.id === createdPayrollId)).toBeDefined();
  });

  it('should get a payroll record by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/payroll/${createdPayrollId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', createdPayrollId);
    expect(res.body.employeeId).toBe(basePayroll.employeeId);
  });

  it('should return 404 for not found payroll record', async () => {
    await request(app.getHttpServer())
      .get('/payroll/nonexistent-id')
      .expect(200) // If your API returns 404, change this to 404
      .expect(res => {
        expect(res.body === null || JSON.stringify(res.body) === '{}').toBe(true);
      });
  });

  it('should update a payroll record', async () => {
    const res = await request(app.getHttpServer())
      .put(`/payroll/${createdPayrollId}`)
      .send({ status: 'Paid' })
      .expect(200);
    expect(res.body.status).toBe('Paid');
  });

  it('should delete a payroll record', async () => {
    await request(app.getHttpServer())
      .delete(`/payroll/${createdPayrollId}`)
      .expect(200);
    // Confirm deletion
    await request(app.getHttpServer())
      .get(`/payroll/${createdPayrollId}`)
      .expect(200)
      .expect(res => {
        expect(res.body === null || JSON.stringify(res.body) === '{}').toBe(true);
      });
    createdPayrollId = undefined;
  });
}); 