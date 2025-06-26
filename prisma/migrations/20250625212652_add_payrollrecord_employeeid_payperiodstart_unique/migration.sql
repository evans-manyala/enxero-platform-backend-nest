/*
  Warnings:

  - A unique constraint covering the columns `[employeeId,payPeriodStart]` on the table `payroll_records` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailVerificationToken" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "payroll_records_employeeId_payPeriodStart_key" ON "payroll_records"("employeeId", "payPeriodStart");

-- CreateIndex
CREATE INDEX "users_resetToken_idx" ON "users"("resetToken");

-- CreateIndex
CREATE INDEX "users_emailVerificationToken_idx" ON "users"("emailVerificationToken");
