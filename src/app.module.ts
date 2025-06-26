import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { RolesModule } from './roles/roles.module';
import { EmployeesModule } from './employees/employees.module';
import { PayrollModule } from './payroll/payroll.module';
import { LeaveModule } from './leave/leave.module';
import { FormsModule } from './forms/forms.module';
import { FilesModule } from './files/files.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuditModule } from './audit/audit.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { SystemModule } from './system/system.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CompaniesModule,
    RolesModule,
    EmployeesModule,
    PayrollModule,
    LeaveModule,
    FormsModule,
    FilesModule,
    NotificationsModule,
    AuditModule,
    IntegrationsModule,
    SystemModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
