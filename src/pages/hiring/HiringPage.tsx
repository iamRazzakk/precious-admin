import { useState } from 'react'
import { Table, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Plus, FileText, GraduationCap } from 'lucide-react'
import { hiresSeed } from '@/data/hires'
import type { Hire, HireStatus } from '@/types'
import { PrimaryButton } from '@/components/common/Buttons'
import { HireDrawer, TRAINING_ITEMS, type HireFormValues } from '@/components/drawer'

const TRAINING_TITLE_BY_ID = TRAINING_ITEMS.reduce<Record<string, string>>((acc, t) => {
  acc[t.id] = t.title
  return acc
}, {})

// ── Constants ─────────────────────────────────────────────────────────────────
const STATUS_STYLE: Record<HireStatus, { bg: string; color: string }> = {
  'In Progress': { bg: '#FEF3C7', color: '#92400E' },
  'Completed':   { bg: '#D1FAE5', color: '#065F46' },
  'Not Started': { bg: '#F1F5F9', color: '#475569' },
}

const PAGE_SIZE = 8

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ value, label }: { value: number; label: string }) => (
  <div className="flex-1 bg-white rounded-xl border border-border-light px-6 py-5 text-center">
    <div className="text-[28px] font-bold text-text-primary leading-[1.1]">{value}</div>
    <div className="text-xs text-text-muted mt-1.5">{label}</div>
  </div>
)

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: HireStatus }) => {
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

// ── Progress Bar ──────────────────────────────────────────────────────────────
const ProgressBar = ({ progress, status }: { progress: number; status: HireStatus }) => {
  const barColor =
    status === 'Completed' ? '#D4A017' :
    status === 'Not Started' ? 'transparent' :
    '#1b3a5c'

  return (
    <div className="min-w-[220px]">
      <div className="w-full h-2 bg-[#E2E8F0] rounded-pill overflow-hidden">
        <div
          className="h-full rounded-pill transition-[width] duration-300 ease-in-out"
          style={{ width: `${progress}%`, background: barColor }}
        />
      </div>
      <div className="text-xs text-text-muted mt-1.5">
        {progress}% complete
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
let nextId = 6

const HiringPage = () => {
  const [hires, setHires] = useState<Hire[]>(hiresSeed)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [page, setPage] = useState(1)

  const total = hires.length
  const inProgress = hires.filter((h) => h.status === 'In Progress').length
  const completed = hires.filter((h) => h.status === 'Completed').length
  const notStarted = hires.filter((h) => h.status === 'Not Started').length

  const columns: ColumnsType<Hire> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <span className="text-sm font-bold text-text-primary whitespace-nowrap">{name}</span>
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
      title: 'Starting Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (startDate?: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">
          {startDate
            ? new Date(startDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : '—'}
        </span>
      ),
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      render: (notes?: string) => (
        <div className={`text-[13px] max-w-[280px] ${notes ? 'text-text-secondary' : 'text-text-muted'}`}>
          {notes
            ? <span title={notes} className="line-clamp-2">{notes}</span>
            : <span>N/A</span>
          }
        </div>
      ),
    },
    {
      title: 'Documents',
      dataIndex: 'documents',
      key: 'documents',
      render: (documents: string[] = []) =>
        documents.length === 0
          ? <span className="text-[13px] text-text-muted">N/A</span>
          : (
            <Tooltip
              title={
                <div className="flex flex-col gap-1">
                  {documents.map((d) => <span key={d}>• {d}</span>)}
                </div>
              }
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-pill bg-[#FEE2E2] text-[12px] font-semibold whitespace-nowrap cursor-default" style={{ color: '#DC2626' }}>
                <FileText size={12} />
                {documents.length} {documents.length === 1 ? 'doc' : 'docs'}
              </span>
            </Tooltip>
          ),
    },
    {
      title: 'Trainings',
      dataIndex: 'trainings',
      key: 'trainings',
      render: (trainings: string[] = []) =>
        trainings.length === 0
          ? <span className="text-[13px] text-text-muted">N/A</span>
          : (
            <Tooltip
              title={
                <div className="flex flex-col gap-1">
                  {trainings.map((id) => (
                    <span key={id}>• {TRAINING_TITLE_BY_ID[id] ?? id}</span>
                  ))}
                </div>
              }
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-pill bg-[#DBEAFE] text-[12px] font-semibold whitespace-nowrap cursor-default" style={{ color: '#1E40AF' }}>
                <GraduationCap size={12} />
                {trainings.length} {trainings.length === 1 ? 'training' : 'trainings'}
              </span>
            </Tooltip>
          ),
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number, record) => (
        <ProgressBar progress={progress} status={record.status} />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: HireStatus) => <StatusBadge status={status} />,
    },
  ]

  const handleSave = (v: HireFormValues) => {
    const progress =
      v.status === 'Completed'   ? 100 :
      v.status === 'Not Started' ? 0   :
      40

    setHires((prev) => [
      ...prev,
      {
        id: nextId++,
        name: v.fullName.trim(),
        role: v.role,
        startDate: v.startDate,
        progress,
        status: v.status,
        notes: v.notes?.trim() || undefined,
        documents: v.documents ?? [],
        trainings: v.trainings ?? [],
      },
    ])
    setDrawerOpen(false)
  }

  return (
    <div className="px-8 py-7 flex flex-col gap-6">

      {/* Stat Cards */}
      <div className="flex gap-4">
        <StatCard value={total}      label="Total New Hires" />
        <StatCard value={inProgress} label="In Progress" />
        <StatCard value={completed}  label="Completed" />
        <StatCard value={notStarted} label="Not Started" />
      </div>

      {/* New Hire Progress Table */}
      <div className="bg-white rounded-[14px] border border-border-light overflow-hidden">
        <div className="px-6 pt-[22px] pb-[18px] flex items-center justify-between">
          <span className="text-xl font-extrabold tracking-[-0.01em]" style={{ color: '#1b3a5c' }}>New Hire Progress</span>
          <PrimaryButton Icon={Plus} label="New Hiring" onClick={() => setDrawerOpen(true)} />
        </div>

        <Table<Hire>
          columns={columns}
          dataSource={hires}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: 'No new hires found.' }}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total: hires.length,
            onChange: (p) => setPage(p),
            showSizeChanger: false,
            hideOnSinglePage: true,
            position: ['bottomRight'],
          }}
        />
      </div>

      <HireDrawer
        open={drawerOpen}
        onSave={handleSave}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  )
}

export default HiringPage
