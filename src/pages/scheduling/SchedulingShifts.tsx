import { useState } from 'react'
import { Table, Button, Popconfirm, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { shiftsSeed } from '@/data/shifts'
import type { Shift, ShiftStatus } from '@/types'
import { ShiftDrawer, type ShiftDrawerState, type ShiftFormValues } from '@/components/drawer'

const STATUS_STYLE: Record<ShiftStatus, { bg: string; color: string }> = {
  Completed: { bg: '#D1FAE5', color: '#065F46' },
  Active:    { bg: '#DBEAFE', color: '#1E40AF' },
  Missed:    { bg: '#FEE2E2', color: '#991B1B' },
  Cancelled: { bg: '#FEF3C7', color: '#92400E' },
}

const PAGE_SIZE = 8

const SHIFT_NAME_VALUES = ['Morning', 'Afternoon', 'Evening', 'Night']

const SHIFT_NAME_STYLE: Record<string, { bg: string; color: string }> = {
  Morning:   { bg: '#FEF3C7', color: '#92400E' },
  Afternoon: { bg: '#DBEAFE', color: '#1E40AF' },
  Evening:   { bg: '#EDE9FE', color: '#5B21B6' },
  Night:     { bg: '#E0E7FF', color: '#3730A3' },
}

const shiftNameFor = (id: number) => SHIFT_NAME_VALUES[id % SHIFT_NAME_VALUES.length]

const computeHours = (start: import('dayjs').Dayjs, end: import('dayjs').Dayjs) => {
  const diff = end.diff(start, 'minute')
  const minutes = diff < 0 ? diff + 24 * 60 : diff
  return Math.round((minutes / 60) * 10) / 10
}

const SchedulingShifts = () => {
  const [shifts, setShifts] = useState<Shift[]>(shiftsSeed)
  const [page, setPage] = useState(1)
  const [drawer, setDrawer] = useState<ShiftDrawerState>({ type: 'none' })

  const closeDrawer = () => setDrawer({ type: 'none' })

  const handleSave = (values: ShiftFormValues) => {
    const hours = computeHours(values.startTime, values.endTime)

    if (drawer.type === 'add') {
      const nextId = shifts.length ? Math.max(...shifts.map((s) => s.id)) + 1 : 1
      setShifts((prev) => [
        {
          id: nextId,
          date: values.date.format('YYYY-MM-DD'),
          staffName: values.caregiver,
          clientName: values.client,
          clockIn: values.startTime.format('hh:mm A'),
          clockOut: values.endTime.format('hh:mm A'),
          hours,
          distance: '—',
          status: 'Active',
        },
        ...prev,
      ])
      message.success('Shift added')
    } else if (drawer.type === 'edit') {
      const id = drawer.shift.id
      setShifts((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                date: values.date.format('YYYY-MM-DD'),
                staffName: values.caregiver,
                clientName: values.client,
                clockIn: values.startTime.format('hh:mm A'),
                clockOut: values.endTime.format('hh:mm A'),
                hours,
              }
            : s,
        ),
      )
      message.success('Shift updated')
    }

    closeDrawer()
  }

  const handleDelete = (id: number) => {
    setShifts((prev) => prev.filter((s) => s.id !== id))
    message.success('Shift deleted')
  }

  const columns: ColumnsType<Shift> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">
          {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
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
      title: 'Staff',
      dataIndex: 'staffName',
      key: 'staffName',
      render: (staffName: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{staffName}</span>
      ),
    },
    {
      title: 'Shift Name',
      key: 'shiftName',
      render: (_, record) => {
        const name = shiftNameFor(record.id)
        const { bg, color } = SHIFT_NAME_STYLE[name]
        return (
          <span
            className="inline-block px-3 py-[3px] rounded-pill text-xs font-semibold whitespace-nowrap"
            style={{ background: bg, color }}
          >
            {name}
          </span>
        )
      },
    },
    {
      title: 'Clock In',
      dataIndex: 'clockIn',
      key: 'clockIn',
      render: (clockIn: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{clockIn}</span>
      ),
    },
    {
      title: 'Clock Out',
      dataIndex: 'clockOut',
      key: 'clockOut',
      render: (clockOut: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{clockOut}</span>
      ),
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
      render: (hours: number) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{hours.toFixed(1)} hrs</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: ShiftStatus) => (
        <span
          className="inline-block px-3 py-[3px] rounded-pill text-xs font-semibold whitespace-nowrap"
          style={{ background: STATUS_STYLE[status].bg, color: STATUS_STYLE[status].color }}
        >
          {status}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawer({ type: 'edit', shift: record })}
            title="Edit"
            className="w-8 h-8 rounded-lg border-0 bg-primary-light text-primary cursor-pointer flex items-center justify-center"
          >
            <Pencil size={14} />
          </button>
          <Popconfirm
            title="Delete Shift"
            description={`Delete shift for "${record.clientName}" on ${new Date(record.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}?`}
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <button
              title="Delete"
              className="w-8 h-8 rounded-lg border-0 bg-danger-light text-danger cursor-pointer flex items-center justify-center"
            >
              <Trash2 size={14} />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="bg-white rounded-[14px] border border-border-light overflow-hidden">
      <div className="px-6 pt-5 pb-4 flex items-center justify-between">
        <span className="text-base font-bold" style={{ color: '#1b3a5c' }}>All Shifts</span>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={() => setDrawer({ type: 'add' })}
          style={{ background: '#1b3a5c', borderColor: '#1b3a5c', height: 38, fontWeight: 600 }}
        >
          Add Shift
        </Button>
      </div>

      <Table<Shift>
        columns={columns}
        dataSource={shifts}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'No shifts found.' }}
        pagination={{
          current: page,
          pageSize: PAGE_SIZE,
          total: shifts.length,
          onChange: (p) => setPage(p),
          showSizeChanger: false,
          hideOnSinglePage: true,
          position: ['bottomRight'],
        }}
      />

      <ShiftDrawer
        state={drawer}
        shiftNameFor={shiftNameFor}
        onSave={handleSave}
        onClose={closeDrawer}
      />
    </div>
  )
}

export default SchedulingShifts
