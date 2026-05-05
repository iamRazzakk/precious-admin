import { useState } from 'react'
import { Table, message, Popconfirm } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Check, X } from 'lucide-react'
import { timesheetsSeed, type Timesheet, type TimesheetStatus } from '@/data/payroll'

const STATUS_STYLE: Record<TimesheetStatus, { bg: string; color: string }> = {
  Approved: { bg: '#D1FAE5', color: '#065F46' },
  Pending:  { bg: '#FEF3C7', color: '#92400E' },
  Rejected: { bg: '#FEE2E2', color: '#991B1B' },
}

const PAGE_SIZE = 8

const formatRange = (startIso: string, endIso: string) => {
  const start = new Date(startIso + 'T00:00:00')
  const end = new Date(endIso + 'T00:00:00')
  const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return `${startStr} - ${endStr}`
}

const PayrollTimesheets = () => {
  const [rows, setRows] = useState<Timesheet[]>(timesheetsSeed)
  const [page, setPage] = useState(1)

  const setStatus = (id: number, status: TimesheetStatus, label: string) => {
    setRows((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
    message.success(`Timesheet ${label}`)
  }

  const columns: ColumnsType<Timesheet> = [
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
      title: 'Week',
      key: 'week',
      render: (_, record) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">
          {formatRange(record.weekStart, record.weekEnd)}
        </span>
      ),
    },
    {
      title: 'Regular Hrs',
      dataIndex: 'hoursRegular',
      key: 'hoursRegular',
      render: (hoursRegular: number) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{hoursRegular}</span>
      ),
    },
    {
      title: 'OT Hrs',
      dataIndex: 'hoursOvertime',
      key: 'hoursOvertime',
      render: (hoursOvertime: number) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{hoursOvertime}</span>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'totalHours',
      key: 'totalHours',
      render: (totalHours: number) => (
        <span className="text-sm font-bold text-text-primary whitespace-nowrap">{totalHours}</span>
      ),
    },
    {
      title: 'Submitted',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      render: (submittedAt: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{submittedAt}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: TimesheetStatus) => {
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
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) =>
        record.status === 'Pending' ? (
          <div className="flex items-center gap-2">
            <Popconfirm
              title="Approve timesheet"
              description={`Approve ${record.employeeName}'s timesheet?`}
              okText="Approve"
              cancelText="Cancel"
              onConfirm={() => setStatus(record.id, 'Approved', 'approved')}
            >
              <button
                title="Approve"
                className="w-8 h-8 rounded-lg border-0 cursor-pointer flex items-center justify-center"
                style={{ background: '#D1FAE5', color: '#065F46' }}
              >
                <Check size={14} />
              </button>
            </Popconfirm>
            <Popconfirm
              title="Reject timesheet"
              description={`Reject ${record.employeeName}'s timesheet?`}
              okText="Reject"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
              onConfirm={() => setStatus(record.id, 'Rejected', 'rejected')}
            >
              <button
                title="Reject"
                className="w-8 h-8 rounded-lg border-0 bg-danger-light text-danger cursor-pointer flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </Popconfirm>
          </div>
        ) : (
          <span className="text-xs text-text-muted">—</span>
        ),
    },
  ]

  return (
    <div>
      <h2 className="text-base font-bold mb-4" style={{ color: '#1b3a5c' }}>Timesheets</h2>
      <div className="bg-white rounded-[14px] border border-border-light overflow-hidden">
        <Table<Timesheet>
          columns={columns}
          dataSource={rows}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: 'No timesheets submitted.' }}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total: rows.length,
            onChange: (p) => setPage(p),
            showSizeChanger: false,
            hideOnSinglePage: true,
            position: ['bottomRight'],
          }}
        />
      </div>
    </div>
  )
}

export default PayrollTimesheets
