import { useState, useMemo } from 'react'
import { Select, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { CalendarCheck, Clock, Activity, History } from 'lucide-react'
import { shiftsSeed } from '@/data/shifts'
import { staffSeed } from '@/data/staff'
import { clientsSeed } from '@/data/clients'
import type { Shift, ShiftStatus } from '@/types'

// ── Constants ─────────────────────────────────────────────────────────────────
const TODAY = '2026-04-28'

const STATUS_STYLE: Record<ShiftStatus, { bg: string; color: string }> = {
  Completed: { bg: '#D1FAE5', color: '#065F46' },
  Active:    { bg: '#DBEAFE', color: '#1E40AF' },
  Missed:    { bg: '#FEE2E2', color: '#991B1B' },
  Cancelled: { bg: '#FEF3C7', color: '#92400E' },
}

const staffOptions = [
  { label: 'All Staff', value: '' },
  ...staffSeed.map((s) => ({ label: s.name, value: s.name })),
]

const clientOptions = [
  { label: 'All Clients', value: '' },
  ...clientsSeed.map((c) => ({ label: c.name, value: c.name })),
]

// ── Stat Card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode
  value: string | number
  label: string
  bg: string
}

const StatCard = ({ icon, value, label, bg }: StatCardProps) => (
  <div
    className="flex-1 rounded-[14px] px-7 py-[22px] flex items-center gap-[18px] min-w-0"
    style={{ background: bg }}
  >
    <div className="flex-shrink-0" style={{ color: 'rgba(255,255,255,0.85)' }}>{icon}</div>
    <div>
      <div className="text-[28px] font-bold text-white leading-[1.1]">{value}</div>
      <div className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>{label}</div>
    </div>
  </div>
)

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: ShiftStatus }) => {
  const { bg, color } = STATUS_STYLE[status]
  return (
    <span
      className="inline-block px-3 py-[3px] rounded-pill text-xs font-semibold whitespace-nowrap"
      style={{ background: bg, color }}
    >
      {status}
    </span>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 8

const ShiftHistoryPage = () => {
  const [staffFilter, setStaffFilter] = useState('')
  const [clientFilter, setClientFilter] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return shiftsSeed.filter((s) => {
      if (staffFilter && s.staffName !== staffFilter) return false
      if (clientFilter && s.clientName !== clientFilter) return false
      if (fromDate && s.date < fromDate) return false
      if (toDate && s.date > toDate) return false
      return true
    })
  }, [staffFilter, clientFilter, fromDate, toDate])

  const shiftsToday = shiftsSeed.filter((s) => s.date === TODAY).length
  const hoursThisWeek = shiftsSeed
    .filter((s) => s.date >= '2026-04-22' && s.date <= TODAY && s.status !== 'Cancelled' && s.status !== 'Missed')
    .reduce((sum, s) => sum + s.hours, 0)
  const activeNow = shiftsSeed.filter((s) => s.status === 'Active').length

  const handleFilterChange = () => setPage(1)

  const inputClass =
    'h-[42px] border border-border rounded-lg px-3 text-sm text-text-primary bg-white outline-none w-full font-[inherit] [color-scheme:light]'

  const columns: ColumnsType<Shift> = [
    {
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">
          {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      ),
    },
    {
      title: 'STAFF',
      dataIndex: 'staffName',
      key: 'staffName',
      render: (staffName: string) => (
        <span className="text-sm font-semibold text-text-primary whitespace-nowrap">{staffName}</span>
      ),
    },
    {
      title: 'CLIENT',
      dataIndex: 'clientName',
      key: 'clientName',
      render: (clientName: string) => (
        <span className="text-sm text-text-primary whitespace-nowrap">{clientName}</span>
      ),
    },
    {
      title: 'CLOCK IN',
      dataIndex: 'clockIn',
      key: 'clockIn',
      render: (clockIn: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{clockIn}</span>
      ),
    },
    {
      title: 'CLOCK OUT',
      dataIndex: 'clockOut',
      key: 'clockOut',
      render: (clockOut: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{clockOut}</span>
      ),
    },
    {
      title: 'HOURS',
      dataIndex: 'hours',
      key: 'hours',
      render: (hours: number) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{hours.toFixed(1)} hrs</span>
      ),
    },
    {
      title: 'DISTANCE',
      dataIndex: 'distance',
      key: 'distance',
      render: (distance: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{distance}</span>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: ShiftStatus) => <StatusBadge status={status} />,
    },
  ]

  return (
    <div className="px-8 py-7 flex flex-col gap-5">

      {/* Page title */}
      <div className="flex items-center gap-2.5">
        <History size={22} color="#2D7D7D" />
        <span className="text-xl font-bold text-text-primary">Shift History</span>
      </div>

      {/* Stat Cards */}
      <div className="flex gap-4">
        <StatCard icon={<CalendarCheck size={32} />} value={shiftsToday} label="Shifts Today"    bg="#1b3a5c" />
        <StatCard icon={<Clock size={32} />}         value={hoursThisWeek.toFixed(1)} label="Hours This Week" bg="#2D7D7D" />
        <StatCard icon={<Activity size={32} />}      value={activeNow}    label="Active Now"      bg="#1A2E44" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-[14px] border border-border-light px-6 py-5 flex gap-4 items-end">
        {/* Staff */}
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-text-secondary mb-2">Staff</div>
          <Select
            value={staffFilter || undefined}
            placeholder="All Staff"
            options={staffOptions}
            onChange={(v) => { setStaffFilter(v ?? ''); handleFilterChange() }}
            allowClear
            style={{ width: '100%', height: 42 }}
          />
        </div>

        {/* Client */}
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-text-secondary mb-2">Client</div>
          <Select
            value={clientFilter || undefined}
            placeholder="All Clients"
            options={clientOptions}
            onChange={(v) => { setClientFilter(v ?? ''); handleFilterChange() }}
            allowClear
            style={{ width: '100%', height: 42 }}
          />
        </div>

        {/* From */}
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-text-secondary mb-2">From</div>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => { setFromDate(e.target.value); handleFilterChange() }}
            className={inputClass}
          />
        </div>

        {/* To */}
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-text-secondary mb-2">To</div>
          <input
            type="date"
            value={toDate}
            onChange={(e) => { setToDate(e.target.value); handleFilterChange() }}
            className={inputClass}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[14px] border border-border-light overflow-hidden">
        <Table<Shift>
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: 'No shift records found.' }}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total: filtered.length,
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

export default ShiftHistoryPage
