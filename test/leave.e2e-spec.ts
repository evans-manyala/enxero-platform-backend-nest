import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Leave Module (e2e)', () => {
  let app: INestApplication;
  let companyId: string;
  let employeeId: string;
  let leaveTypeId: string;
  let leaveRequestId: string | undefined;
  const uniqueSuffix = Date.now();
  const baseCompany = {
    name: `Leave Test Company ${uniqueSuffix}`,
    identifier: `LEAVETEST${uniqueSuffix}`,
    isActive: true,
  };
  const baseEmployee = {
    email: `leaveemployee${uniqueSuffix}@example.com`,
    employeeId: `LEAVEEMP${uniqueSuffix}`,
    firstName: 'Leave',
    lastName: 'Employee',
    department: 'HR',
    position: 'Officer',
    status: 'Active',
    hireDate: new Date().toISOString(),
    salary: 5000.00,
  };
  const baseLeaveType = {
    name: `Annual Leave ${uniqueSuffix}`,
    maxDays: 30,
    isActive: true,
  };
  let baseLeaveRequest: any;

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

    // Wait for DB consistency
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Create an employee
    const employeeRes = await request(app.getHttpServer())
      .post('/employees')
      .send({ ...baseEmployee, companyId })
      .expect(201);
    employeeId = employeeRes.body.id;

    // Create a leave type
    const leaveTypeRes = await request(app.getHttpServer())
      .post('/leave/types')
      .send({ ...baseLeaveType, maxDays: 30, companyId })
      .expect(201);
    leaveTypeId = leaveTypeRes.body.id;

    // Prepare base leave request
    baseLeaveRequest = {
      employeeId,
      typeId: leaveTypeId,
      companyId,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Pending',
    };
  });

  afterAll(async () => {
    // Clean up: delete the created leave request, leave type, employee, and company
    if (leaveRequestId) {
      await request(app.getHttpServer())
        .delete(`/leave/requests/${leaveRequestId}`)
        .catch(() => {});
    }
    if (leaveTypeId) {
      await request(app.getHttpServer())
        .delete(`/leave/types/${leaveTypeId}`)
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

  // --- Leave Type CRUD ---
  it('should create a leave type', async () => {
    const testLeaveType = {
      name: `Sick Leave ${uniqueSuffix}`,
      maxDays: 15,
      isActive: true,
    };
    const res = await request(app.getHttpServer())
      .post('/leave/types')
      .send({ ...testLeaveType, companyId })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(testLeaveType.name);
    // Clean up
    await request(app.getHttpServer())
      .delete(`/leave/types/${res.body.id}`)
      .expect(200);
  });

  it('should not create a duplicate leave type (name, companyId)', async () => {
    await request(app.getHttpServer())
      .post('/leave/types')
      .send({ ...baseLeaveType, maxDays: 30, companyId })
      .expect(400);
  });

  it('should not create a leave type with invalid payload', async () => {
    await request(app.getHttpServer())
      .post('/leave/types')
      .send({})
      .expect(400);
  });

  it('should get all leave types', async () => {
    const res = await request(app.getHttpServer())
      .get('/leave/types')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((t: any) => t.id === leaveTypeId)).toBeDefined();
  });

  it('should get a leave type by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/leave/types/${leaveTypeId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', leaveTypeId);
    expect(res.body.name).toBe(baseLeaveType.name);
  });

  it('should update a leave type', async () => {
    const res = await request(app.getHttpServer())
      .put(`/leave/types/${leaveTypeId}`)
      .send({ description: 'Updated description' })
      .expect(200);
    expect(res.body.description).toBe('Updated description');
  });

  // --- Leave Request CRUD ---
  it('should create a leave request', async () => {
    const res = await request(app.getHttpServer())
      .post('/leave/requests')
      .send(baseLeaveRequest)
      .expect(201);
    expect(res.body).toHaveProperty('id');
    leaveRequestId = res.body.id;
    expect(res.body.employeeId).toBe(baseLeaveRequest.employeeId);
    expect(res.body.typeId).toBe(baseLeaveRequest.typeId);
  });

  it('should not create a leave request with invalid payload', async () => {
    await request(app.getHttpServer())
      .post('/leave/requests')
      .send({})
      .expect(400);
  });

  it('should get all leave requests', async () => {
    const res = await request(app.getHttpServer())
      .get('/leave/requests')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((r: any) => r.id === leaveRequestId)).toBeDefined();
  });

  it('should get a leave request by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/leave/requests/${leaveRequestId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', leaveRequestId);
    expect(res.body.employeeId).toBe(baseLeaveRequest.employeeId);
  });

  it('should update a leave request', async () => {
    const res = await request(app.getHttpServer())
      .put(`/leave/requests/${leaveRequestId}`)
      .send({ status: 'Approved' })
      .expect(200);
    expect(res.body.status).toBe('Approved');
  });

  it('should delete a leave request', async () => {
    await request(app.getHttpServer())
      .delete(`/leave/requests/${leaveRequestId}`)
      .expect(200);
    // Confirm deletion
    await request(app.getHttpServer())
      .get(`/leave/requests/${leaveRequestId}`)
      .expect(200)
      .expect(res => {
        expect(res.body === null || JSON.stringify(res.body) === '{}').toBe(true);
      });
    leaveRequestId = undefined;
  });
}); 