export type PayrollRole = 'CNA' | 'HHA' | 'RN' | 'LPN' | 'Caregiver' | 'Supervisor'

export type PayrollPayPeriodStatus = 'Approved' | 'Pending' | 'Processed'

export interface PayrollEmployee {
  id: number
  name: string
  role: PayrollRole
  email: string
  phone: string
  rate: number
  payType: 'Hourly' | 'Salaried'
  hireDate: string
  status: 'Active' | 'On Leave' | 'Terminated'
}

export type TimesheetStatus = 'Approved' | 'Pending' | 'Rejected'

export interface Timesheet {
  id: number
  employeeId: number
  employeeName: string
  role: PayrollRole
  weekStart: string
  weekEnd: string
  hoursRegular: number
  hoursOvertime: number
  totalHours: number
  status: TimesheetStatus
  submittedAt: string
}

export interface PayPeriodEntry {
  id: number
  employeeId: number
  employeeName: string
  role: PayrollRole
  rate: number
  hours: number
  status: PayrollPayPeriodStatus
}

export interface PayPeriod {
  id: number
  start: string
  end: string
  entries: PayPeriodEntry[]
}

export type PayStubStatus = 'Issued' | 'Pending'

export interface PayStub {
  id: number
  employeeId: number
  employeeName: string
  role: PayrollRole
  periodStart: string
  periodEnd: string
  hours: number
  rate: number
  gross: number
  taxes: number
  net: number
  issuedDate: string
  status: PayStubStatus
}

export interface PayrollReport {
  id: number
  title: string
  description: string
  period: string
  generatedDate: string
  format: 'PDF' | 'CSV' | 'XLSX'
}

export const payrollEmployees: PayrollEmployee[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'CNA',
    email: 'sarah.mitchell@precious.com',
    phone: '(503) 555-2001',
    rate: 20.0,
    payType: 'Hourly',
    hireDate: '2024-01-15',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    role: 'Caregiver',
    email: 'maria.garcia@precious.com',
    phone: '(503) 555-2002',
    rate: 18.0,
    payType: 'Hourly',
    hireDate: '2024-03-08',
    status: 'Active',
  },
  {
    id: 3,
    name: 'David Thompson',
    role: 'RN',
    email: 'david.thompson@precious.com',
    phone: '(503) 555-2003',
    rate: 42.0,
    payType: 'Hourly',
    hireDate: '2023-11-10',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Lisa Nguyen',
    role: 'CNA',
    email: 'lisa.nguyen@precious.com',
    phone: '(503) 555-2004',
    rate: 19.5,
    payType: 'Hourly',
    hireDate: '2024-06-20',
    status: 'Active',
  },
  {
    id: 5,
    name: 'James Wilson',
    role: 'Caregiver',
    email: 'james.wilson@precious.com',
    phone: '(503) 555-2005',
    rate: 17.5,
    payType: 'Hourly',
    hireDate: '2024-02-01',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Amanda Foster',
    role: 'LPN',
    email: 'amanda.foster@precious.com',
    phone: '(503) 555-2006',
    rate: 30.0,
    payType: 'Hourly',
    hireDate: '2024-04-12',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Robert Chen',
    role: 'Supervisor',
    email: 'robert.chen@precious.com',
    phone: '(503) 555-2007',
    rate: 35.0,
    payType: 'Salaried',
    hireDate: '2023-08-03',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Patricia Brown',
    role: 'HHA',
    email: 'patricia.brown@precious.com',
    phone: '(503) 555-2008',
    rate: 17.0,
    payType: 'Hourly',
    hireDate: '2024-09-01',
    status: 'Active',
  },
]

export const currentPayPeriod: PayPeriod = {
  id: 1,
  start: '2026-04-20',
  end: '2026-04-26',
  entries: [
    { id: 1, employeeId: 1, employeeName: 'Sarah Mitchell',  role: 'CNA',       rate: 20.0, hours: 40, status: 'Approved'  },
    { id: 2, employeeId: 2, employeeName: 'Maria Garcia',    role: 'Caregiver', rate: 18.0, hours: 41, status: 'Approved'  },
    { id: 3, employeeId: 3, employeeName: 'David Thompson',  role: 'RN',        rate: 42.0, hours: 46, status: 'Processed' },
    { id: 4, employeeId: 4, employeeName: 'Lisa Nguyen',     role: 'CNA',       rate: 19.5, hours: 40, status: 'Pending'   },
    { id: 5, employeeId: 5, employeeName: 'James Wilson',    role: 'Caregiver', rate: 17.5, hours: 40, status: 'Processed' },
    { id: 6, employeeId: 6, employeeName: 'Amanda Foster',   role: 'LPN',       rate: 30.0, hours: 40, status: 'Pending'   },
  ],
}

export const timesheetsSeed: Timesheet[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'Sarah Mitchell',
    role: 'CNA',
    weekStart: '2026-04-20',
    weekEnd: '2026-04-26',
    hoursRegular: 40,
    hoursOvertime: 0,
    totalHours: 40,
    status: 'Approved',
    submittedAt: '2026-04-26 18:32',
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Maria Garcia',
    role: 'Caregiver',
    weekStart: '2026-04-20',
    weekEnd: '2026-04-26',
    hoursRegular: 40,
    hoursOvertime: 1,
    totalHours: 41,
    status: 'Approved',
    submittedAt: '2026-04-26 19:05',
  },
  {
    id: 3,
    employeeId: 4,
    employeeName: 'Lisa Nguyen',
    role: 'CNA',
    weekStart: '2026-04-20',
    weekEnd: '2026-04-26',
    hoursRegular: 40,
    hoursOvertime: 0,
    totalHours: 40,
    status: 'Pending',
    submittedAt: '2026-04-27 08:14',
  },
  {
    id: 4,
    employeeId: 6,
    employeeName: 'Amanda Foster',
    role: 'LPN',
    weekStart: '2026-04-20',
    weekEnd: '2026-04-26',
    hoursRegular: 40,
    hoursOvertime: 0,
    totalHours: 40,
    status: 'Pending',
    submittedAt: '2026-04-27 09:42',
  },
  {
    id: 5,
    employeeId: 3,
    employeeName: 'David Thompson',
    role: 'RN',
    weekStart: '2026-04-20',
    weekEnd: '2026-04-26',
    hoursRegular: 40,
    hoursOvertime: 6,
    totalHours: 46,
    status: 'Approved',
    submittedAt: '2026-04-26 21:10',
  },
  {
    id: 6,
    employeeId: 5,
    employeeName: 'James Wilson',
    role: 'Caregiver',
    weekStart: '2026-04-20',
    weekEnd: '2026-04-26',
    hoursRegular: 40,
    hoursOvertime: 0,
    totalHours: 40,
    status: 'Approved',
    submittedAt: '2026-04-26 17:45',
  },
  {
    id: 7,
    employeeId: 8,
    employeeName: 'Patricia Brown',
    role: 'HHA',
    weekStart: '2026-04-13',
    weekEnd: '2026-04-19',
    hoursRegular: 36,
    hoursOvertime: 0,
    totalHours: 36,
    status: 'Approved',
    submittedAt: '2026-04-19 18:20',
  },
  {
    id: 8,
    employeeId: 1,
    employeeName: 'Sarah Mitchell',
    role: 'CNA',
    weekStart: '2026-04-13',
    weekEnd: '2026-04-19',
    hoursRegular: 40,
    hoursOvertime: 2,
    totalHours: 42,
    status: 'Approved',
    submittedAt: '2026-04-19 20:11',
  },
]

export const payStubsSeed: PayStub[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'Sarah Mitchell',
    role: 'CNA',
    periodStart: '2026-04-13',
    periodEnd: '2026-04-19',
    hours: 42,
    rate: 20.0,
    gross: 840.0,
    taxes: 168.0,
    net: 672.0,
    issuedDate: '2026-04-22',
    status: 'Issued',
  },
  {
    id: 2,
    employeeId: 3,
    employeeName: 'David Thompson',
    role: 'RN',
    periodStart: '2026-04-13',
    periodEnd: '2026-04-19',
    hours: 44,
    rate: 42.0,
    gross: 1848.0,
    taxes: 462.0,
    net: 1386.0,
    issuedDate: '2026-04-22',
    status: 'Issued',
  },
  {
    id: 3,
    employeeId: 5,
    employeeName: 'James Wilson',
    role: 'Caregiver',
    periodStart: '2026-04-13',
    periodEnd: '2026-04-19',
    hours: 40,
    rate: 17.5,
    gross: 700.0,
    taxes: 140.0,
    net: 560.0,
    issuedDate: '2026-04-22',
    status: 'Issued',
  },
  {
    id: 4,
    employeeId: 8,
    employeeName: 'Patricia Brown',
    role: 'HHA',
    periodStart: '2026-04-13',
    periodEnd: '2026-04-19',
    hours: 36,
    rate: 17.0,
    gross: 612.0,
    taxes: 122.4,
    net: 489.6,
    issuedDate: '2026-04-22',
    status: 'Issued',
  },
  {
    id: 5,
    employeeId: 2,
    employeeName: 'Maria Garcia',
    role: 'Caregiver',
    periodStart: '2026-04-06',
    periodEnd: '2026-04-12',
    hours: 40,
    rate: 18.0,
    gross: 720.0,
    taxes: 144.0,
    net: 576.0,
    issuedDate: '2026-04-15',
    status: 'Issued',
  },
  {
    id: 6,
    employeeId: 6,
    employeeName: 'Amanda Foster',
    role: 'LPN',
    periodStart: '2026-04-06',
    periodEnd: '2026-04-12',
    hours: 40,
    rate: 30.0,
    gross: 1200.0,
    taxes: 300.0,
    net: 900.0,
    issuedDate: '2026-04-15',
    status: 'Issued',
  },
]

export const payrollReportsSeed: PayrollReport[] = [
  {
    id: 1,
    title: 'Payroll Summary - April 2026',
    description: 'Monthly payroll totals broken down by department and role.',
    period: 'April 2026',
    generatedDate: '2026-05-01',
    format: 'PDF',
  },
  {
    id: 2,
    title: 'Tax Withholding Report - Q1 2026',
    description: 'Federal and state tax withholdings for the first quarter.',
    period: 'Q1 2026',
    generatedDate: '2026-04-05',
    format: 'XLSX',
  },
  {
    id: 3,
    title: 'Overtime Analysis - April 2026',
    description: 'Overtime hours and cost per employee for April.',
    period: 'April 2026',
    generatedDate: '2026-05-01',
    format: 'CSV',
  },
  {
    id: 4,
    title: 'Year-to-Date Earnings',
    description: 'YTD gross, tax, and net earnings per employee.',
    period: 'Jan - Apr 2026',
    generatedDate: '2026-05-01',
    format: 'PDF',
  },
  {
    id: 5,
    title: 'Bi-Weekly Payroll - Week 16',
    description: 'Detailed payroll register for the pay period ending April 26.',
    period: 'April 20 - April 26, 2026',
    generatedDate: '2026-04-27',
    format: 'PDF',
  },
]
