import { useState, useMemo } from 'react'
import { Input, Select, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Search } from 'lucide-react'
import { inquiriesSeed } from '@/data/inquiries'
import type { Inquiry, InquiryStatus } from '@/types'

// ── Constants ─────────────────────────────────────────────────────────────────
const STATUS_OPTIONS: { label: InquiryStatus; value: InquiryStatus }[] = [
  { label: 'New',       value: 'New' },
  { label: 'Contacted', value: 'Contacted' },
  { label: 'Converted', value: 'Converted' },
  { label: 'Closed',    value: 'Closed' },
]

const PAGE_SIZE = 5

// ── Main Page ─────────────────────────────────────────────────────────────────
const InquiriesPage = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>(inquiriesSeed)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return inquiries
    return inquiries.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.phone.includes(q) ||
        i.service.toLowerCase().includes(q),
    )
  }, [inquiries, search])

  const updateStatus = (id: number, status: InquiryStatus) =>
    setInquiries((p) => p.map((i) => (i.id === id ? { ...i, status } : i)))

  const handleSearch = (val: string) => {
    setSearch(val)
    setPage(1)
  }

  const columns: ColumnsType<Inquiry> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{date}</span>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <span className="text-sm font-bold text-text-primary whitespace-nowrap">{name}</span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{email}</span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{phone}</span>
      ),
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      render: (service: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{service}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: InquiryStatus, record) => (
        <Select
          value={status}
          options={STATUS_OPTIONS}
          onChange={(s: InquiryStatus) => updateStatus(record.id, s)}
          style={{ width: 140 }}
          size="small"
        />
      ),
    },
  ]

  return (
    <div className="px-8 py-7">
      <div className="bg-white rounded-[14px] border border-border-light overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between gap-4">
          <span className="text-lg font-bold" style={{ color: '#1b3a5c' }}>Inquiries</span>

          <Input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search inquiries..."
            prefix={<Search size={14} className="text-text-muted" />}
            allowClear
            style={{ width: 280, height: 38, borderRadius: 9999 }}
          />
        </div>

        {/* Table */}
        <Table<Inquiry>
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: 'No inquiries found.' }}
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

export default InquiriesPage
