import { useState } from 'react'
import { Select, Table, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { FileText, MessageSquare } from 'lucide-react'
import { Card } from '@/components/common'
import { applicationsSeed } from '@/data/applications'
import type { Application, ApplicationStatus, Certification } from '@/types'

// ── Constants ─────────────────────────────────────────────────────────────────
const STATUS_OPTIONS: { label: string; value: ApplicationStatus }[] = [
  { label: 'Applied',      value: 'Applied' },
  { label: 'Under Review', value: 'Under Review' },
  { label: 'Interview',    value: 'Interview' },
  { label: 'Hired',        value: 'Hired' },
  { label: 'Rejected',     value: 'Rejected' },
]

const CERT_STYLE: Record<Certification, { bg: string; color: string }> = {
  'CNA':             { bg: '#D1FAE5', color: '#065F46' },
  'HHA':             { bg: '#DBEAFE', color: '#1E40AF' },
  'RN':              { bg: '#EDE9FE', color: '#5B21B6' },
  'LPN':             { bg: '#CCFBF1', color: '#0F766E' },
  'Medication Aide': { bg: '#FEF3C7', color: '#92400E' },
  'CPR/First Aid':   { bg: '#FCE7F3', color: '#9D174D' },
  'Dementia Care':   { bg: '#F3E8FF', color: '#6B21A8' },
  'Other':           { bg: '#F1F5F9', color: '#475569' },
}

// ── Badges ────────────────────────────────────────────────────────────────────
const CertBadge = ({ cert }: { cert: Certification }) => {
  const { bg, color } = CERT_STYLE[cert]
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-pill text-[11px] font-semibold whitespace-nowrap"
      style={{ background: bg, color }}
    >
      {cert}
    </span>
  )
}

const NA = () => (
  <span className="text-[13px] text-text-muted">N/A</span>
)

// ── Main Page ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 5

const ApplicationsPage = () => {
  const [apps, setApps] = useState<Application[]>(applicationsSeed)
  const [page, setPage] = useState(1)

  const updateStatus = (id: number, status: ApplicationStatus) =>
    setApps((p) => p.map((a) => (a.id === id ? { ...a, status } : a)))

  const columns: ColumnsType<Application> = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (fullName: string) => (
        <span className="text-sm font-bold text-text-primary whitespace-nowrap">{fullName}</span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <span className="text-[13px] text-text-secondary whitespace-nowrap">{email}</span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => (
        <span className="text-[13px] text-text-secondary whitespace-nowrap">{phone}</span>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (position: string) => (
        <span className="text-[13px] text-text-secondary whitespace-nowrap">{position}</span>
      ),
    },
    {
      title: 'Emp. Type',
      dataIndex: 'employmentType',
      key: 'employmentType',
      render: (employmentType: string) => (
        <span className="text-[13px] text-text-secondary whitespace-nowrap">{employmentType}</span>
      ),
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      render: (experience: number) => (
        <span className="text-[13px] text-text-secondary whitespace-nowrap">{experience} yrs</span>
      ),
    },
    {
      title: 'Certifications',
      dataIndex: 'certifications',
      key: 'certifications',
      render: (certifications: Certification[]) => (
        <div className="flex flex-wrap gap-1 min-w-[160px]">
          {certifications.map((c) => <CertBadge key={c} cert={c} />)}
        </div>
      ),
    },
    {
      title: 'Resume',
      dataIndex: 'resume',
      key: 'resume',
      align: 'center',
      render: (resume?: string) =>
        resume
          ? (
            <Tooltip title={resume}>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#FEE2E2] cursor-default">
                <FileText size={16} color="#DC2626" />
              </span>
            </Tooltip>
          )
          : <NA />,
    },
    {
      title: 'Cover Letter',
      dataIndex: 'coverLetter',
      key: 'coverLetter',
      align: 'center',
      render: (coverLetter?: string) =>
        coverLetter
          ? (
            <Tooltip title={coverLetter}>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#DBEAFE] cursor-default">
                <MessageSquare size={16} color="#2563EB" />
              </span>
            </Tooltip>
          )
          : <NA />,
    },
    {
      title: 'Available',
      dataIndex: 'availabilityDate',
      key: 'availabilityDate',
      render: (availabilityDate: string) => (
        <span className="text-[13px] text-text-secondary whitespace-nowrap">
          {new Date(availabilityDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: ApplicationStatus, record) => (
        <Select
          value={status}
          options={STATUS_OPTIONS}
          onChange={(s: ApplicationStatus) => updateStatus(record.id, s)}
          style={{ width: 140 }}
          size="small"
        />
      ),
    },
  ]

  return (
    <div className="px-8 py-7">
      <Card padding={0}>
        <div className="px-6 pt-5 pb-4">
          <span className="text-base font-bold text-text-primary">Application Management</span>
        </div>

        <Table<Application>
          columns={columns}
          dataSource={apps}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: 'No applications found.' }}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total: apps.length,
            onChange: (p) => setPage(p),
            showSizeChanger: false,
            hideOnSinglePage: true,
            position: ['bottomRight'],
          }}
        />
      </Card>
    </div>
  )
}

export default ApplicationsPage
