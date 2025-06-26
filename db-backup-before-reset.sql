--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 14.18 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Integration; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public."Integration" (
    id text NOT NULL,
    name character varying(100) NOT NULL,
    type character varying(50) NOT NULL,
    config jsonb NOT NULL,
    status character varying(20) NOT NULL,
    "companyId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Integration" OWNER TO evansmanyala;

--
-- Name: IntegrationLog; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public."IntegrationLog" (
    id text NOT NULL,
    "integrationId" text NOT NULL,
    message text NOT NULL,
    type character varying(50) NOT NULL,
    status character varying(20) NOT NULL,
    data jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."IntegrationLog" OWNER TO evansmanyala;

--
-- Name: SystemConfig; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public."SystemConfig" (
    id text NOT NULL,
    key text NOT NULL,
    value jsonb NOT NULL,
    description text,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SystemConfig" OWNER TO evansmanyala;

--
-- Name: SystemLog; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public."SystemLog" (
    id text NOT NULL,
    level text NOT NULL,
    message text NOT NULL,
    metadata jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."SystemLog" OWNER TO evansmanyala;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO evansmanyala;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.audit_logs (
    id text NOT NULL,
    action text NOT NULL,
    "entityType" text NOT NULL,
    "entityId" text NOT NULL,
    "userId" text NOT NULL,
    metadata jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.audit_logs OWNER TO evansmanyala;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.companies (
    id text NOT NULL,
    name character varying(255) NOT NULL,
    identifier character varying(50),
    "fullName" character varying(255),
    "shortName" character varying(100),
    "workPhone" character varying(20),
    city character varying(100),
    address jsonb,
    settings jsonb,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.companies OWNER TO evansmanyala;

--
-- Name: email_logs; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.email_logs (
    id text NOT NULL,
    recipient character varying(255) NOT NULL,
    subject character varying(255) NOT NULL,
    status character varying(50) NOT NULL,
    "messageId" character varying(255),
    error text,
    "sentAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "companyId" text
);


ALTER TABLE public.email_logs OWNER TO evansmanyala;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.employees (
    id text NOT NULL,
    "employeeId" character varying(50) NOT NULL,
    "firstName" character varying(100) NOT NULL,
    "lastName" character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    "phoneNumber" character varying(20),
    department character varying(100) NOT NULL,
    "position" character varying(100) NOT NULL,
    status character varying(50) NOT NULL,
    "hireDate" timestamp(3) without time zone NOT NULL,
    "terminationDate" timestamp(3) without time zone,
    salary numeric(10,2) NOT NULL,
    "emergencyContact" jsonb,
    address jsonb,
    "bankDetails" jsonb,
    "taxInfo" jsonb,
    benefits jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "companyId" text NOT NULL,
    "userId" text,
    "managerId" text
);


ALTER TABLE public.employees OWNER TO evansmanyala;

--
-- Name: failed_login_attempts; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.failed_login_attempts (
    id text NOT NULL,
    "userId" text,
    email character varying(255) NOT NULL,
    "ipAddress" character varying(45),
    "userAgent" character varying(255),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_login_attempts OWNER TO evansmanyala;

--
-- Name: files; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.files (
    id text NOT NULL,
    filename text NOT NULL,
    "storageName" text NOT NULL,
    mimetype text NOT NULL,
    size integer NOT NULL,
    description text,
    tags text[],
    "entityType" text,
    "entityId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.files OWNER TO evansmanyala;

--
-- Name: form_fields; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.form_fields (
    id text NOT NULL,
    type character varying(50) NOT NULL,
    label character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    required boolean DEFAULT false NOT NULL,
    options jsonb,
    validation jsonb,
    "order" integer NOT NULL,
    "formId" text NOT NULL
);


ALTER TABLE public.form_fields OWNER TO evansmanyala;

--
-- Name: form_responses; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.form_responses (
    id text NOT NULL,
    "fieldName" character varying(255) NOT NULL,
    value text NOT NULL,
    "submissionId" text NOT NULL
);


ALTER TABLE public.form_responses OWNER TO evansmanyala;

--
-- Name: form_submissions; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.form_submissions (
    id text NOT NULL,
    "submittedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "formId" text NOT NULL,
    "submittedBy" text NOT NULL
);


ALTER TABLE public.form_submissions OWNER TO evansmanyala;

--
-- Name: forms; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.forms (
    id text NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    category character varying(50) NOT NULL,
    status character varying(50) NOT NULL,
    "isTemplate" boolean DEFAULT false NOT NULL,
    settings jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "companyId" text NOT NULL,
    "createdBy" text NOT NULL
);


ALTER TABLE public.forms OWNER TO evansmanyala;

--
-- Name: leave_balances; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.leave_balances (
    id text NOT NULL,
    "totalDays" integer NOT NULL,
    "usedDays" integer DEFAULT 0 NOT NULL,
    "remainingDays" integer NOT NULL,
    year integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "employeeId" text NOT NULL,
    "typeId" text NOT NULL
);


ALTER TABLE public.leave_balances OWNER TO evansmanyala;

--
-- Name: leave_requests; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.leave_requests (
    id text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    status character varying(50) NOT NULL,
    notes character varying(500),
    "approvalNotes" character varying(500),
    "rejectionNotes" character varying(500),
    "approvedAt" timestamp(3) without time zone,
    "rejectedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "employeeId" text NOT NULL,
    "typeId" text NOT NULL,
    "companyId" text NOT NULL,
    "approverId" text
);


ALTER TABLE public.leave_requests OWNER TO evansmanyala;

--
-- Name: leave_types; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.leave_types (
    id text NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(500),
    "maxDays" integer NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "companyId" text NOT NULL
);


ALTER TABLE public.leave_types OWNER TO evansmanyala;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.notifications (
    id text NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    type character varying(50) NOT NULL,
    category character varying(50) NOT NULL,
    data jsonb,
    "isRead" boolean DEFAULT false NOT NULL,
    "readAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL,
    "companyId" text NOT NULL
);


ALTER TABLE public.notifications OWNER TO evansmanyala;

--
-- Name: payroll_configs; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.payroll_configs (
    id text NOT NULL,
    "companyId" text NOT NULL,
    "payFrequency" character varying(20) NOT NULL,
    "payDay" integer NOT NULL,
    "taxSettings" jsonb,
    deductions jsonb,
    allowances jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.payroll_configs OWNER TO evansmanyala;

--
-- Name: payroll_periods; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.payroll_periods (
    id text NOT NULL,
    "companyId" text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    status character varying(20) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.payroll_periods OWNER TO evansmanyala;

--
-- Name: payroll_records; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.payroll_records (
    id text NOT NULL,
    "payPeriodStart" timestamp(3) without time zone NOT NULL,
    "payPeriodEnd" timestamp(3) without time zone NOT NULL,
    "grossSalary" numeric(10,2) NOT NULL,
    "totalDeductions" numeric(10,2) NOT NULL,
    "netSalary" numeric(10,2) NOT NULL,
    "workingDays" integer NOT NULL,
    deductions jsonb,
    allowances jsonb,
    status character varying(50) NOT NULL,
    "processedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "employeeId" text NOT NULL,
    "companyId" text NOT NULL,
    "periodId" text NOT NULL
);


ALTER TABLE public.payroll_records OWNER TO evansmanyala;

--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.refresh_tokens (
    id text NOT NULL,
    token character varying(255) NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public.refresh_tokens OWNER TO evansmanyala;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.roles (
    id text NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(500),
    permissions text[],
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO evansmanyala;

--
-- Name: user_activities; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.user_activities (
    id text NOT NULL,
    "userId" text NOT NULL,
    action character varying(100) NOT NULL,
    "ipAddress" character varying(45),
    "userAgent" character varying(255),
    metadata jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_activities OWNER TO evansmanyala;

--
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.user_sessions (
    id text NOT NULL,
    "userId" text NOT NULL,
    token text NOT NULL,
    "ipAddress" character varying(45),
    "userAgent" character varying(255),
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_sessions OWNER TO evansmanyala;

--
-- Name: users; Type: TABLE; Schema: public; Owner: evansmanyala
--

CREATE TABLE public.users (
    id text NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "firstName" character varying(100) NOT NULL,
    "lastName" character varying(100) NOT NULL,
    "phoneNumber" character varying(20),
    avatar character varying(255),
    "isActive" boolean DEFAULT true NOT NULL,
    "emailVerified" boolean DEFAULT false NOT NULL,
    "twoFactorSecret" character varying(255),
    "backupCodes" text[],
    "resetToken" character varying(255),
    "resetTokenExpiry" timestamp(3) without time zone,
    "lastLogin" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "companyId" text NOT NULL,
    "roleId" text,
    bio text,
    language character varying(10),
    preferences jsonb,
    timezone character varying(50),
    "accountStatus" character varying(20),
    "deactivatedAt" timestamp(3) without time zone,
    "deactivationReason" text,
    "lastPasswordChange" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "passwordHistory" jsonb,
    "emailVerificationToken" character varying(255)
);


ALTER TABLE public.users OWNER TO evansmanyala;

--
-- Data for Name: Integration; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public."Integration" (id, name, type, config, status, "companyId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: IntegrationLog; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public."IntegrationLog" (id, "integrationId", message, type, status, data, "createdAt") FROM stdin;
\.


--
-- Data for Name: SystemConfig; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public."SystemConfig" (id, key, value, description, "isActive", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: SystemLog; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public."SystemLog" (id, level, message, metadata, "createdAt") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
d730a341-138e-469c-b79b-7c3b7a279998	79ac9550c03b6bbe2957a54bfd0c9a3a6d0b92143615dd6ede4183addea37c9a	2025-06-25 13:24:51.84447+03	20250618202619_init	\N	\N	2025-06-25 13:24:51.611481+03	1
c0294f4f-9cea-4dd1-819a-9e5403e11263	b90c6fb543d2c90a7438facca0b17aae33812db711f7a68eb868792bbf3db17d	2025-06-25 13:24:51.849715+03	20250619055134_add_files_model	\N	\N	2025-06-25 13:24:51.845655+03	1
74792f52-d811-4c9f-a839-afd0afada6b3	9f9c07df4b6a83b84ca5214929088b4cf9a7441175fc4a8164f5ae70ace84465	2025-06-25 13:24:51.900131+03	20250619171942_add_audit_logs_model	\N	\N	2025-06-25 13:24:51.85042+03	1
585b6785-5b66-4953-baf1-7334fdfe7645	84dae78b95946bc66d9d67b05c104d5e9bc8e48dc22d38aaabe936d6eb2a2a10	2025-06-25 13:24:51.919684+03	20250619185908_add_integration_models	\N	\N	2025-06-25 13:24:51.901377+03	1
fbc9b4a0-0463-4cb4-bbe5-b63c1a82d049	fab8dbb5c607a3d9260d63287f5cd3c38157b0292644b7654ca31065f211daed	2025-06-25 13:24:52.007839+03	20250619192038_pascalcase_integration_models	\N	\N	2025-06-25 13:24:51.920465+03	1
14fdcf98-167d-4a87-8c3e-510dda0a7c85	45c3cf6b9815cb7c22b45739b089012c046d07c00c569af8b0bbc63fff72decf	2025-06-25 13:24:52.013169+03	20250621150719_increase_user_session_token_length	\N	\N	2025-06-25 13:24:52.008512+03	1
\.


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.audit_logs (id, action, "entityType", "entityId", "userId", metadata, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.companies (id, name, identifier, "fullName", "shortName", "workPhone", city, address, settings, "isActive", "createdAt", "updatedAt") FROM stdin;
27fbda20-aa5b-4d9e-9f76-4e3d5d7633b5	Default Company	DEFAULT	\N	\N	\N	\N	\N	\N	t	2025-06-25 20:47:40.989	2025-06-25 20:47:40.989
ea1c0f56-8c57-4df0-80a8-d82ff43e7f20	Auth's Company	AUTHTEST1750884474520	\N	\N	\N	\N	\N	\N	t	2025-06-25 20:47:56.111	2025-06-25 20:47:56.111
8d7cdfa9-f7f3-47f0-92cd-f3a77b5291c0	Auth's Company	AUTHTEST1750884499620	\N	\N	\N	\N	\N	\N	t	2025-06-25 20:48:20.086	2025-06-25 20:48:20.086
\.


--
-- Data for Name: email_logs; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.email_logs (id, recipient, subject, status, "messageId", error, "sentAt", "companyId") FROM stdin;
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.employees (id, "employeeId", "firstName", "lastName", email, "phoneNumber", department, "position", status, "hireDate", "terminationDate", salary, "emergencyContact", address, "bankDetails", "taxInfo", benefits, "createdAt", "updatedAt", "companyId", "userId", "managerId") FROM stdin;
\.


--
-- Data for Name: failed_login_attempts; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.failed_login_attempts (id, "userId", email, "ipAddress", "userAgent", "createdAt") FROM stdin;
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.files (id, filename, "storageName", mimetype, size, description, tags, "entityType", "entityId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: form_fields; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.form_fields (id, type, label, name, required, options, validation, "order", "formId") FROM stdin;
\.


--
-- Data for Name: form_responses; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.form_responses (id, "fieldName", value, "submissionId") FROM stdin;
\.


--
-- Data for Name: form_submissions; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.form_submissions (id, "submittedAt", "formId", "submittedBy") FROM stdin;
\.


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.forms (id, title, description, category, status, "isTemplate", settings, "createdAt", "updatedAt", "companyId", "createdBy") FROM stdin;
\.


--
-- Data for Name: leave_balances; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.leave_balances (id, "totalDays", "usedDays", "remainingDays", year, "createdAt", "updatedAt", "employeeId", "typeId") FROM stdin;
\.


--
-- Data for Name: leave_requests; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.leave_requests (id, "startDate", "endDate", status, notes, "approvalNotes", "rejectionNotes", "approvedAt", "rejectedAt", "createdAt", "updatedAt", "employeeId", "typeId", "companyId", "approverId") FROM stdin;
\.


--
-- Data for Name: leave_types; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.leave_types (id, name, description, "maxDays", "isActive", "createdAt", "updatedAt", "companyId") FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.notifications (id, title, message, type, category, data, "isRead", "readAt", "createdAt", "userId", "companyId") FROM stdin;
\.


--
-- Data for Name: payroll_configs; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.payroll_configs (id, "companyId", "payFrequency", "payDay", "taxSettings", deductions, allowances, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: payroll_periods; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.payroll_periods (id, "companyId", "startDate", "endDate", status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: payroll_records; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.payroll_records (id, "payPeriodStart", "payPeriodEnd", "grossSalary", "totalDeductions", "netSalary", "workingDays", deductions, allowances, status, "processedAt", "createdAt", "updatedAt", "employeeId", "companyId", "periodId") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.refresh_tokens (id, token, "expiresAt", "createdAt", "userId") FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.roles (id, name, description, permissions, "isActive", "createdAt", "updatedAt") FROM stdin;
1cb9e6db-ad4c-48e8-99de-0be3df6f706f	ADMIN	Administrator role with full access	{read:all,write:all,read:users,write:users,read:roles,write:roles}	t	2025-06-25 20:47:40.939	2025-06-25 20:47:40.939
8b1f4c06-8f9f-4076-8876-9c2c45bc54fe	USER	Default user role with basic permissions	{read:own,write:own}	t	2025-06-25 20:47:40.984	2025-06-25 20:47:40.984
\.


--
-- Data for Name: user_activities; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.user_activities (id, "userId", action, "ipAddress", "userAgent", metadata, "createdAt") FROM stdin;
049eebdc-afb1-4901-81cf-f2b171700e8f	a83e862b-9857-49e7-a39c-c715876208cb	USER_REGISTERED	127.0.0.1	jest	{"username": "authtest1750884474520"}	2025-06-25 20:47:56.517
6b22f930-0dd3-4462-8d10-b00be93d56c9	a83e862b-9857-49e7-a39c-c715876208cb	USER_LOGGED_IN	127.0.0.1	jest	{"username": "authtest1750884474520"}	2025-06-25 20:47:56.703
0b03b231-80e0-405a-a7c8-9975c05c7efa	c34c2338-2909-409f-ab5f-e26be71a73fe	USER_REGISTERED	127.0.0.1	jest	{"username": "authtest1750884499620"}	2025-06-25 20:48:20.103
321b0b3e-59b8-4ffa-9020-0d674e9a3603	c34c2338-2909-409f-ab5f-e26be71a73fe	USER_LOGGED_IN	127.0.0.1	jest	{"username": "authtest1750884499620"}	2025-06-25 20:48:20.24
\.


--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.user_sessions (id, "userId", token, "ipAddress", "userAgent", "expiresAt", "createdAt") FROM stdin;
c873838b-c2b1-4c60-bd40-9d8c6be72d4b	a83e862b-9857-49e7-a39c-c715876208cb	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhODNlODYyYi05ODU3LTQ5ZTctYTM5Yy1jNzE1ODc2MjA4Y2IiLCJyb2xlSWQiOiI4YjFmNGMwNi04ZjlmLTQwNzYtODg3Ni05YzJjNDViYzU0ZmUiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1MDg4NDQ3NiwiZXhwIjoxNzUxNDg5Mjc2fQ.ptKkP9kJC3cPi7TUDBcQW9E-wodv4B0aRDHoDHvH5DU	127.0.0.1	jest	2025-06-26 20:47:56.789	2025-06-25 20:47:56.79
3976b4a4-b827-4eae-b945-22f6e1e86324	c34c2338-2909-409f-ab5f-e26be71a73fe	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMzRjMjMzOC0yOTA5LTQwOWYtYWI1Zi1lMjZiZTcxYTczZmUiLCJyb2xlSWQiOiI4YjFmNGMwNi04ZjlmLTQwNzYtODg3Ni05YzJjNDViYzU0ZmUiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1MDg4NDUwMCwiZXhwIjoxNzUxNDg5MzAwfQ.ugVDSzg2UQYbFFOLJFi6FA_-_DdR1ZjKeDexm5h5m-w	127.0.0.1	jest	2025-06-26 20:48:20.254	2025-06-25 20:48:20.255
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: evansmanyala
--

COPY public.users (id, username, email, password, "firstName", "lastName", "phoneNumber", avatar, "isActive", "emailVerified", "twoFactorSecret", "backupCodes", "resetToken", "resetTokenExpiry", "lastLogin", "createdAt", "updatedAt", "companyId", "roleId", bio, language, preferences, timezone, "accountStatus", "deactivatedAt", "deactivationReason", "lastPasswordChange", "passwordHistory", "emailVerificationToken") FROM stdin;
54f761cb-23c9-41ad-a808-efd77ac1662c	admin	admin@example.com	$2b$10$Kbre2pJvJ121XBYzO/piluQdalP0egOIP4NqM3FJXZ3geMg6ABHqm	Admin	User	\N	\N	t	f	\N	\N	\N	\N	\N	2025-06-25 20:47:41.079	2025-06-25 20:47:41.079	27fbda20-aa5b-4d9e-9f76-4e3d5d7633b5	1cb9e6db-ad4c-48e8-99de-0be3df6f706f	\N	\N	\N	\N	\N	\N	\N	2025-06-25 20:47:41.079	\N	\N
052f409d-fec2-44f9-a5c9-f5ff665f6ba8	johndoe	john.doe@example.com	$2b$10$B3NRTpAKOhgYFugUy7LwH.el5T38d3GIBekv7MnyiRfaIh6ntBava	John	Doe	\N	\N	t	f	\N	\N	\N	\N	\N	2025-06-25 20:47:41.162	2025-06-25 20:47:41.162	27fbda20-aa5b-4d9e-9f76-4e3d5d7633b5	8b1f4c06-8f9f-4076-8876-9c2c45bc54fe	\N	\N	\N	\N	\N	\N	\N	2025-06-25 20:47:41.162	\N	\N
132bbbb0-d6eb-49e1-81e4-6cb61c4f9d51	janesmith	jane.smith@example.com	$2b$10$B3NRTpAKOhgYFugUy7LwH.el5T38d3GIBekv7MnyiRfaIh6ntBava	Jane	Smith	\N	\N	t	f	\N	\N	\N	\N	\N	2025-06-25 20:47:41.167	2025-06-25 20:47:41.167	27fbda20-aa5b-4d9e-9f76-4e3d5d7633b5	8b1f4c06-8f9f-4076-8876-9c2c45bc54fe	\N	\N	\N	\N	\N	\N	\N	2025-06-25 20:47:41.167	\N	\N
3ec602a0-1a4c-47cb-969c-56076ac04a9e	bobwilson	bob.wilson@example.com	$2b$10$B3NRTpAKOhgYFugUy7LwH.el5T38d3GIBekv7MnyiRfaIh6ntBava	Bob	Wilson	\N	\N	t	f	\N	\N	\N	\N	\N	2025-06-25 20:47:41.171	2025-06-25 20:47:41.171	27fbda20-aa5b-4d9e-9f76-4e3d5d7633b5	8b1f4c06-8f9f-4076-8876-9c2c45bc54fe	\N	\N	\N	\N	\N	\N	\N	2025-06-25 20:47:41.171	\N	\N
661eeb43-3ec6-4ad3-a197-964c1d5c9aea	alicejohnson	alice.johnson@example.com	$2b$10$B3NRTpAKOhgYFugUy7LwH.el5T38d3GIBekv7MnyiRfaIh6ntBava	Alice	Johnson	\N	\N	t	f	\N	\N	\N	\N	\N	2025-06-25 20:47:41.175	2025-06-25 20:47:41.175	27fbda20-aa5b-4d9e-9f76-4e3d5d7633b5	8b1f4c06-8f9f-4076-8876-9c2c45bc54fe	\N	\N	\N	\N	\N	\N	\N	2025-06-25 20:47:41.175	\N	\N
a83e862b-9857-49e7-a39c-c715876208cb	authtest1750884474520	authtest+1750884474520@example.com	$2b$10$aU3xRUmUyQNu5lHRFfUFjexIDeBV.uwJbk2YB63qs025XvGuz2sAG	Auth	Test	\N	\N	t	f	\N	\N	9856636ead09d5891c2f3b60ffbc31b43e316ef1aa29e9c5956f8825d90fca8b	2025-06-25 21:47:56.796	2025-06-25 20:47:56.611	2025-06-25 20:47:56.138	2025-06-25 20:47:56.909	ea1c0f56-8c57-4df0-80a8-d82ff43e7f20	8b1f4c06-8f9f-4076-8876-9c2c45bc54fe	\N	\N	\N	\N	\N	\N	\N	2025-06-25 20:47:56.138	\N	b7524ee5897a0fb1c8dfe56e857e7164d3d2393005f3b5ebe676bd714c49362b
c34c2338-2909-409f-ab5f-e26be71a73fe	authtest1750884499620	authtest+1750884499620@example.com	$2b$10$xCW9cjVZCRz25VU0C1F8suIitaJDgBZQt6os0fREADgDoOUQxM9Ry	Auth	Test	\N	\N	t	f	\N	\N	a06adf4a6ea254780e20a42ba2023162f3360eb6daa13f5775e71e4675d57748	2025-06-25 21:48:20.262	2025-06-25 20:48:20.232	2025-06-25 20:48:20.089	2025-06-25 20:48:20.373	8d7cdfa9-f7f3-47f0-92cd-f3a77b5291c0	8b1f4c06-8f9f-4076-8876-9c2c45bc54fe	\N	\N	\N	\N	\N	\N	\N	2025-06-25 20:48:20.089	\N	ac3cb4377dafc15c3d1c8e9df5ba5d34476d7de3a7bfa790eca04b7825d73d88
\.


--
-- Name: IntegrationLog IntegrationLog_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public."IntegrationLog"
    ADD CONSTRAINT "IntegrationLog_pkey" PRIMARY KEY (id);


--
-- Name: Integration Integration_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public."Integration"
    ADD CONSTRAINT "Integration_pkey" PRIMARY KEY (id);


--
-- Name: SystemConfig SystemConfig_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public."SystemConfig"
    ADD CONSTRAINT "SystemConfig_pkey" PRIMARY KEY (id);


--
-- Name: SystemLog SystemLog_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public."SystemLog"
    ADD CONSTRAINT "SystemLog_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: email_logs email_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.email_logs
    ADD CONSTRAINT email_logs_pkey PRIMARY KEY (id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: failed_login_attempts failed_login_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.failed_login_attempts
    ADD CONSTRAINT failed_login_attempts_pkey PRIMARY KEY (id);


--
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- Name: form_fields form_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.form_fields
    ADD CONSTRAINT form_fields_pkey PRIMARY KEY (id);


--
-- Name: form_responses form_responses_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.form_responses
    ADD CONSTRAINT form_responses_pkey PRIMARY KEY (id);


--
-- Name: form_submissions form_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT form_submissions_pkey PRIMARY KEY (id);


--
-- Name: forms forms_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_pkey PRIMARY KEY (id);


--
-- Name: leave_balances leave_balances_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.leave_balances
    ADD CONSTRAINT leave_balances_pkey PRIMARY KEY (id);


--
-- Name: leave_requests leave_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.leave_requests
    ADD CONSTRAINT leave_requests_pkey PRIMARY KEY (id);


--
-- Name: leave_types leave_types_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.leave_types
    ADD CONSTRAINT leave_types_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: payroll_configs payroll_configs_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.payroll_configs
    ADD CONSTRAINT payroll_configs_pkey PRIMARY KEY (id);


--
-- Name: payroll_periods payroll_periods_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.payroll_periods
    ADD CONSTRAINT payroll_periods_pkey PRIMARY KEY (id);


--
-- Name: payroll_records payroll_records_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.payroll_records
    ADD CONSTRAINT payroll_records_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: user_activities user_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.user_activities
    ADD CONSTRAINT user_activities_pkey PRIMARY KEY (id);


--
-- Name: user_sessions user_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IntegrationLog_createdAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "IntegrationLog_createdAt_idx" ON public."IntegrationLog" USING btree ("createdAt");


--
-- Name: IntegrationLog_integrationId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "IntegrationLog_integrationId_idx" ON public."IntegrationLog" USING btree ("integrationId");


--
-- Name: IntegrationLog_status_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "IntegrationLog_status_idx" ON public."IntegrationLog" USING btree (status);


--
-- Name: IntegrationLog_type_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "IntegrationLog_type_idx" ON public."IntegrationLog" USING btree (type);


--
-- Name: Integration_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "Integration_companyId_idx" ON public."Integration" USING btree ("companyId");


--
-- Name: Integration_createdAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "Integration_createdAt_idx" ON public."Integration" USING btree ("createdAt");


--
-- Name: Integration_name_companyId_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX "Integration_name_companyId_key" ON public."Integration" USING btree (name, "companyId");


--
-- Name: Integration_status_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "Integration_status_idx" ON public."Integration" USING btree (status);


--
-- Name: Integration_type_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "Integration_type_idx" ON public."Integration" USING btree (type);


--
-- Name: SystemConfig_key_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX "SystemConfig_key_key" ON public."SystemConfig" USING btree (key);


--
-- Name: audit_logs_action_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX audit_logs_action_idx ON public.audit_logs USING btree (action);


--
-- Name: audit_logs_createdAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "audit_logs_createdAt_idx" ON public.audit_logs USING btree ("createdAt");


--
-- Name: audit_logs_entityId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "audit_logs_entityId_idx" ON public.audit_logs USING btree ("entityId");


--
-- Name: audit_logs_entityType_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "audit_logs_entityType_idx" ON public.audit_logs USING btree ("entityType");


--
-- Name: audit_logs_userId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "audit_logs_userId_idx" ON public.audit_logs USING btree ("userId");


--
-- Name: companies_identifier_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX companies_identifier_idx ON public.companies USING btree (identifier);


--
-- Name: companies_identifier_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX companies_identifier_key ON public.companies USING btree (identifier);


--
-- Name: companies_isActive_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "companies_isActive_idx" ON public.companies USING btree ("isActive");


--
-- Name: companies_name_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX companies_name_idx ON public.companies USING btree (name);


--
-- Name: email_logs_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "email_logs_companyId_idx" ON public.email_logs USING btree ("companyId");


--
-- Name: email_logs_recipient_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX email_logs_recipient_idx ON public.email_logs USING btree (recipient);


--
-- Name: email_logs_sentAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "email_logs_sentAt_idx" ON public.email_logs USING btree ("sentAt");


--
-- Name: email_logs_status_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX email_logs_status_idx ON public.email_logs USING btree (status);


--
-- Name: employees_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "employees_companyId_idx" ON public.employees USING btree ("companyId");


--
-- Name: employees_department_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX employees_department_idx ON public.employees USING btree (department);


--
-- Name: employees_email_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX employees_email_idx ON public.employees USING btree (email);


--
-- Name: employees_email_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX employees_email_key ON public.employees USING btree (email);


--
-- Name: employees_employeeId_companyId_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX "employees_employeeId_companyId_key" ON public.employees USING btree ("employeeId", "companyId");


--
-- Name: employees_employeeId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "employees_employeeId_idx" ON public.employees USING btree ("employeeId");


--
-- Name: employees_hireDate_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "employees_hireDate_idx" ON public.employees USING btree ("hireDate");


--
-- Name: employees_managerId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "employees_managerId_idx" ON public.employees USING btree ("managerId");


--
-- Name: employees_position_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX employees_position_idx ON public.employees USING btree ("position");


--
-- Name: employees_status_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX employees_status_idx ON public.employees USING btree (status);


--
-- Name: employees_userId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "employees_userId_idx" ON public.employees USING btree ("userId");


--
-- Name: employees_userId_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX "employees_userId_key" ON public.employees USING btree ("userId");


--
-- Name: failed_login_attempts_createdAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "failed_login_attempts_createdAt_idx" ON public.failed_login_attempts USING btree ("createdAt");


--
-- Name: failed_login_attempts_email_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX failed_login_attempts_email_idx ON public.failed_login_attempts USING btree (email);


--
-- Name: failed_login_attempts_ipAddress_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "failed_login_attempts_ipAddress_idx" ON public.failed_login_attempts USING btree ("ipAddress");


--
-- Name: failed_login_attempts_userId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "failed_login_attempts_userId_idx" ON public.failed_login_attempts USING btree ("userId");


--
-- Name: form_fields_formId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "form_fields_formId_idx" ON public.form_fields USING btree ("formId");


--
-- Name: form_fields_name_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX form_fields_name_idx ON public.form_fields USING btree (name);


--
-- Name: form_fields_order_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX form_fields_order_idx ON public.form_fields USING btree ("order");


--
-- Name: form_fields_type_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX form_fields_type_idx ON public.form_fields USING btree (type);


--
-- Name: form_responses_fieldName_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "form_responses_fieldName_idx" ON public.form_responses USING btree ("fieldName");


--
-- Name: form_responses_submissionId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "form_responses_submissionId_idx" ON public.form_responses USING btree ("submissionId");


--
-- Name: form_submissions_formId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "form_submissions_formId_idx" ON public.form_submissions USING btree ("formId");


--
-- Name: form_submissions_submittedAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "form_submissions_submittedAt_idx" ON public.form_submissions USING btree ("submittedAt");


--
-- Name: form_submissions_submittedBy_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "form_submissions_submittedBy_idx" ON public.form_submissions USING btree ("submittedBy");


--
-- Name: forms_category_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX forms_category_idx ON public.forms USING btree (category);


--
-- Name: forms_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "forms_companyId_idx" ON public.forms USING btree ("companyId");


--
-- Name: forms_createdAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "forms_createdAt_idx" ON public.forms USING btree ("createdAt");


--
-- Name: forms_createdBy_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "forms_createdBy_idx" ON public.forms USING btree ("createdBy");


--
-- Name: forms_isTemplate_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "forms_isTemplate_idx" ON public.forms USING btree ("isTemplate");


--
-- Name: forms_status_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX forms_status_idx ON public.forms USING btree (status);


--
-- Name: forms_title_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX forms_title_idx ON public.forms USING btree (title);


--
-- Name: leave_balances_employeeId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "leave_balances_employeeId_idx" ON public.leave_balances USING btree ("employeeId");


--
-- Name: leave_balances_typeId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "leave_balances_typeId_idx" ON public.leave_balances USING btree ("typeId");


--
-- Name: leave_balances_year_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX leave_balances_year_idx ON public.leave_balances USING btree (year);


--
-- Name: leave_requests_approverId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "leave_requests_approverId_idx" ON public.leave_requests USING btree ("approverId");


--
-- Name: leave_requests_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "leave_requests_companyId_idx" ON public.leave_requests USING btree ("companyId");


--
-- Name: leave_requests_employeeId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "leave_requests_employeeId_idx" ON public.leave_requests USING btree ("employeeId");


--
-- Name: leave_requests_status_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX leave_requests_status_idx ON public.leave_requests USING btree (status);


--
-- Name: leave_requests_typeId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "leave_requests_typeId_idx" ON public.leave_requests USING btree ("typeId");


--
-- Name: leave_types_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "leave_types_companyId_idx" ON public.leave_types USING btree ("companyId");


--
-- Name: leave_types_isActive_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "leave_types_isActive_idx" ON public.leave_types USING btree ("isActive");


--
-- Name: notifications_category_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX notifications_category_idx ON public.notifications USING btree (category);


--
-- Name: notifications_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "notifications_companyId_idx" ON public.notifications USING btree ("companyId");


--
-- Name: notifications_createdAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "notifications_createdAt_idx" ON public.notifications USING btree ("createdAt");


--
-- Name: notifications_isRead_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "notifications_isRead_idx" ON public.notifications USING btree ("isRead");


--
-- Name: notifications_type_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX notifications_type_idx ON public.notifications USING btree (type);


--
-- Name: notifications_userId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "notifications_userId_idx" ON public.notifications USING btree ("userId");


--
-- Name: payroll_configs_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_configs_companyId_idx" ON public.payroll_configs USING btree ("companyId");


--
-- Name: payroll_configs_companyId_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX "payroll_configs_companyId_key" ON public.payroll_configs USING btree ("companyId");


--
-- Name: payroll_periods_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_periods_companyId_idx" ON public.payroll_periods USING btree ("companyId");


--
-- Name: payroll_periods_endDate_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_periods_endDate_idx" ON public.payroll_periods USING btree ("endDate");


--
-- Name: payroll_periods_startDate_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_periods_startDate_idx" ON public.payroll_periods USING btree ("startDate");


--
-- Name: payroll_periods_status_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX payroll_periods_status_idx ON public.payroll_periods USING btree (status);


--
-- Name: payroll_records_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_records_companyId_idx" ON public.payroll_records USING btree ("companyId");


--
-- Name: payroll_records_employeeId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_records_employeeId_idx" ON public.payroll_records USING btree ("employeeId");


--
-- Name: payroll_records_payPeriodEnd_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_records_payPeriodEnd_idx" ON public.payroll_records USING btree ("payPeriodEnd");


--
-- Name: payroll_records_payPeriodStart_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_records_payPeriodStart_idx" ON public.payroll_records USING btree ("payPeriodStart");


--
-- Name: payroll_records_periodId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_records_periodId_idx" ON public.payroll_records USING btree ("periodId");


--
-- Name: payroll_records_processedAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "payroll_records_processedAt_idx" ON public.payroll_records USING btree ("processedAt");


--
-- Name: payroll_records_status_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX payroll_records_status_idx ON public.payroll_records USING btree (status);


--
-- Name: refresh_tokens_expiresAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "refresh_tokens_expiresAt_idx" ON public.refresh_tokens USING btree ("expiresAt");


--
-- Name: refresh_tokens_token_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX refresh_tokens_token_idx ON public.refresh_tokens USING btree (token);


--
-- Name: refresh_tokens_token_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX refresh_tokens_token_key ON public.refresh_tokens USING btree (token);


--
-- Name: refresh_tokens_userId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "refresh_tokens_userId_idx" ON public.refresh_tokens USING btree ("userId");


--
-- Name: roles_isActive_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "roles_isActive_idx" ON public.roles USING btree ("isActive");


--
-- Name: roles_name_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX roles_name_idx ON public.roles USING btree (name);


--
-- Name: roles_name_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX roles_name_key ON public.roles USING btree (name);


--
-- Name: user_activities_action_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX user_activities_action_idx ON public.user_activities USING btree (action);


--
-- Name: user_activities_createdAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "user_activities_createdAt_idx" ON public.user_activities USING btree ("createdAt");


--
-- Name: user_activities_userId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "user_activities_userId_idx" ON public.user_activities USING btree ("userId");


--
-- Name: user_sessions_expiresAt_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "user_sessions_expiresAt_idx" ON public.user_sessions USING btree ("expiresAt");


--
-- Name: user_sessions_token_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX user_sessions_token_idx ON public.user_sessions USING btree (token);


--
-- Name: user_sessions_token_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX user_sessions_token_key ON public.user_sessions USING btree (token);


--
-- Name: user_sessions_userId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "user_sessions_userId_idx" ON public.user_sessions USING btree ("userId");


--
-- Name: users_accountStatus_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_accountStatus_idx" ON public.users USING btree ("accountStatus");


--
-- Name: users_companyId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_companyId_idx" ON public.users USING btree ("companyId");


--
-- Name: users_emailVerificationToken_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_emailVerificationToken_idx" ON public.users USING btree ("emailVerificationToken");


--
-- Name: users_emailVerified_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_emailVerified_idx" ON public.users USING btree ("emailVerified");


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_isActive_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_isActive_idx" ON public.users USING btree ("isActive");


--
-- Name: users_lastLogin_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_lastLogin_idx" ON public.users USING btree ("lastLogin");


--
-- Name: users_lastPasswordChange_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_lastPasswordChange_idx" ON public.users USING btree ("lastPasswordChange");


--
-- Name: users_resetToken_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_resetToken_idx" ON public.users USING btree ("resetToken");


--
-- Name: users_roleId_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX "users_roleId_idx" ON public.users USING btree ("roleId");


--
-- Name: users_username_idx; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE INDEX users_username_idx ON public.users USING btree (username);


--
-- Name: users_username_key; Type: INDEX; Schema: public; Owner: evansmanyala
--

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


--
-- Name: IntegrationLog IntegrationLog_integrationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public."IntegrationLog"
    ADD CONSTRAINT "IntegrationLog_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES public."Integration"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Integration Integration_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public."Integration"
    ADD CONSTRAINT "Integration_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: audit_logs audit_logs_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: email_logs email_logs_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.email_logs
    ADD CONSTRAINT "email_logs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: employees employees_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "employees_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: employees employees_managerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "employees_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES public.employees(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: employees employees_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "employees_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: failed_login_attempts failed_login_attempts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.failed_login_attempts
    ADD CONSTRAINT "failed_login_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: form_fields form_fields_formId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.form_fields
    ADD CONSTRAINT "form_fields_formId_fkey" FOREIGN KEY ("formId") REFERENCES public.forms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: form_responses form_responses_submissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.form_responses
    ADD CONSTRAINT "form_responses_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES public.form_submissions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: form_submissions form_submissions_formId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT "form_submissions_formId_fkey" FOREIGN KEY ("formId") REFERENCES public.forms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: form_submissions form_submissions_submittedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT "form_submissions_submittedBy_fkey" FOREIGN KEY ("submittedBy") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: forms forms_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT "forms_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: forms forms_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT "forms_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: leave_balances leave_balances_employeeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.leave_balances
    ADD CONSTRAINT "leave_balances_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public.employees(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: leave_balances leave_balances_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.leave_balances
    ADD CONSTRAINT "leave_balances_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public.leave_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: leave_requests leave_requests_approverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.leave_requests
    ADD CONSTRAINT "leave_requests_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: leave_requests leave_requests_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.leave_requests
    ADD CONSTRAINT "leave_requests_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: leave_requests leave_requests_employeeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.leave_requests
    ADD CONSTRAINT "leave_requests_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public.employees(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: leave_requests leave_requests_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.leave_requests
    ADD CONSTRAINT "leave_requests_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public.leave_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: leave_types leave_types_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.leave_types
    ADD CONSTRAINT "leave_types_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: notifications notifications_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: notifications notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payroll_configs payroll_configs_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.payroll_configs
    ADD CONSTRAINT "payroll_configs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payroll_periods payroll_periods_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.payroll_periods
    ADD CONSTRAINT "payroll_periods_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payroll_records payroll_records_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.payroll_records
    ADD CONSTRAINT "payroll_records_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payroll_records payroll_records_employeeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.payroll_records
    ADD CONSTRAINT "payroll_records_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public.employees(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payroll_records payroll_records_periodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.payroll_records
    ADD CONSTRAINT "payroll_records_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES public.payroll_periods(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_activities user_activities_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.user_activities
    ADD CONSTRAINT "user_activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_sessions user_sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT "user_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: evansmanyala
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

