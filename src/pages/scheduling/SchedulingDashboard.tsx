import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { shiftsSeed } from '@/data/shifts'
import type { Shift } from '@/types'

const TODAY = '2026-04-28'

type ScheduleStatus = 'Confirmed' | 'Pending' | 'Open'

const mapStatus = (s: string): ScheduleStatus => {
  if (s === 'Active' || s === 'Completed') return 'Confirmed'
  if (s === 'Cancelled' || s === 'Missed') return 'Open'
  return 'Pending'
}

type Attendance = 'Confirmed' | 'Pending'

const ATTENDANCE_STYLE: Record<Attendance, { bg: string; color: string }> = {
  Confirmed: { bg: '#D1FAE5', color: '#065F46' },
  Pending:   { bg: '#FEF3C7', color: '#92400E' },
}

const attendanceFor = (id: number): Attendance => (id % 2 === 0 ? 'Confirmed' : 'Pending')

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const StatCard = ({ value, label, color }: { value: number; label: string; color: string }) => (
  <div className="flex-1 bg-white rounded-[14px] border border-border-light px-6 py-5 text-center">
    <div className="text-[28px] font-bold leading-[1.1]" style={{ color }}>{value}</div>
    <div className="text-xs text-text-muted mt-1.5">{label}</div>
  </div>
)

const SchedulingDashboard = () => {
  const todayShifts = shiftsSeed.filter((s) => s.date === TODAY)
  const total = todayShifts.length
  const confirmed = todayShifts.filter((s) => mapStatus(s.status) === 'Confirmed').length
  const pending = todayShifts.filter((s) => mapStatus(s.status) === 'Pending').length
  const open = todayShifts.filter((s) => mapStatus(s.status) === 'Open').length

  const columns: ColumnsType<Shift> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{formatDate(date)}</span>
      ),
    },
    {
      title: 'Start Time',
      dataIndex: 'clockIn',
      key: 'clockIn',
      render: (clockIn: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{clockIn}</span>
      ),
    },
    {
      title: 'End Time',
      dataIndex: 'clockOut',
      key: 'clockOut',
      render: (clockOut: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{clockOut}</span>
      ),
    },
    {
      title: 'Client',
      dataIndex: 'clientName',
      key: 'clientName',
      render: (clientName: string) => (
        <span className="text-sm font-bold text-text-primary whitespace-nowrap">{clientName}</span>
      ),
    },
    {
      title: 'Caregiver',
      dataIndex: 'staffName',
      key: 'staffName',
      render: (staffName: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{staffName}</span>
      ),
    },
    {
      title: 'Attendance',
      key: 'attendance',
      render: (_, record) => {
        const attendance = attendanceFor(record.id)
        const { bg, color } = ATTENDANCE_STYLE[attendance]
        return (
          <span
            className="inline-block px-3 py-[3px] rounded-pill text-xs font-semibold whitespace-nowrap"
            style={{ background: bg, color }}
          >
            {attendance}
          </span>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="flex gap-4">
        <StatCard value={total} label="Today's Shifts" color="#0F172A" />
        <StatCard value={confirmed} label="Confirmed" color="#10B981" />
        <StatCard value={pending} label="Pending" color="#F59E0B" />
        <StatCard value={open} label="Open" color="#EF4444" />
      </div>

      {/* Today's schedule table */}
      <div className="bg-white rounded-[14px] border border-border-light overflow-hidden">
        <div className="px-6 pt-5 pb-4">
          <h3 className="text-base font-bold" style={{ color: '#1b3a5c' }}>Today's Schedule</h3>
        </div>

        <Table<Shift>
          columns={columns}
          dataSource={todayShifts}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: 'No shifts scheduled for today.' }}
          pagination={false}
        />
      </div>
    </div>
  )
}

export default SchedulingDashboard
