import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  payrollEmployees,
  currentPayPeriod,
  type PayPeriodEntry,
  type PayrollPayPeriodStatus,
} from '@/data/payroll'

const STATUS_STYLE: Record<PayrollPayPeriodStatus, { bg: string; color: string }> = {
  Approved:  { bg: '#D1FAE5', color: '#065F46' },
  Pending:   { bg: '#FEF3C7', color: '#92400E' },
  Processed: { bg: '#FEF3C7', color: '#92400E' },
}

const formatRange = (startIso: string, endIso: string) => {
  const start = new Date(startIso + 'T00:00:00')
  const end = new Date(endIso + 'T00:00:00')
  const startStr = start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  const endStr = end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${startStr} - ${endStr}`
}

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="flex-1 bg-white rounded-[14px] border border-border-light px-6 py-5 text-center">
    <div className="text-[28px] font-bold leading-[1.1]" style={{ color: '#1b3a5c' }}>
      {value}
    </div>
    <div className="text-xs text-text-muted mt-1.5">{label}</div>
  </div>
)

const PayrollDashboard = () => {
  const activeEmployees = payrollEmployees.filter((e) => e.status === 'Active').length
  const pendingTimesheets = currentPayPeriod.entries.filter((e) => e.status === 'Pending').length
  const approvedHours = currentPayPeriod.entries
    .filter((e) => e.status === 'Approved')
    .reduce((sum, e) => sum + e.hours, 0)
  const estGrossPay = currentPayPeriod.entries
    .filter((e) => e.status === 'Approved')
    .reduce((sum, e) => sum + e.hours * e.rate, 0)

  const columns: ColumnsType<PayPeriodEntry> = [
    {
      title: 'Employee',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: (employeeName: string) => (
        <span className="text-sm font-bold text-text-primary whitespace-nowrap">{employeeName}</span>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{role}</span>
      ),
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      render: (rate: number) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">${rate.toFixed(2)}</span>
      ),
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
      render: (hours: number) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{hours}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: PayrollPayPeriodStatus) => {
        const { bg, color } = STATUS_STYLE[status]
        return (
          <span
            className="inline-block px-3 py-[3px] rounded-pill text-xs font-semibold whitespace-nowrap"
            style={{ background: bg, color }}
          >
            {status}
          </span>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="flex gap-4">
        <StatCard value={String(activeEmployees)} label="Active Employees" />
        <StatCard value={String(pendingTimesheets)} label="Pending Timesheets" />
        <StatCard value={String(approvedHours)} label="Approved Hours" />
        <StatCard
          value={`$${estGrossPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          label="Est. Gross Pay"
        />
      </div>

      {/* Pay Period table */}
      <div className="bg-white rounded-[14px] border border-border-light overflow-hidden">
        <div className="px-6 pt-5 pb-4">
          <h3 className="text-base font-bold" style={{ color: '#1b3a5c' }}>
            Pay Period: {formatRange(currentPayPeriod.start, currentPayPeriod.end)}
          </h3>
        </div>

        <Table<PayPeriodEntry>
          columns={columns}
          dataSource={currentPayPeriod.entries}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: 'No pay period entries.' }}
          pagination={false}
        />
      </div>
    </div>
  )
}

export default PayrollDashboard
