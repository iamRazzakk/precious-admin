import { useState, useMemo } from 'react'
import { Select, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { paymentsSeed } from '@/data/payments'
import type { Payment, PaymentMethod, PaymentStatus } from '@/types'

// ── Constants ─────────────────────────────────────────────────────────────────
const ALL_METHODS: PaymentMethod[] = ['Card', 'Zelle', 'Bank Transfer', 'CashApp', 'Apple Pay', 'Check']
const ALL_STATUSES: PaymentStatus[] = ['Confirmed', 'Pending', 'Failed', 'Refunded']

const methodOptions = [
  { label: 'All Methods', value: '' },
  ...ALL_METHODS.map((m) => ({ label: m, value: m })),
]

const statusOptions = [
  { label: 'All Statuses', value: '' },
  ...ALL_STATUSES.map((s) => ({ label: s, value: s })),
]

const STATUS_STYLE: Record<PaymentStatus, { bg: string; color: string }> = {
  Confirmed: { bg: '#D1FAE5', color: '#065F46' },
  Pending:   { bg: '#FEF3C7', color: '#D97706' },
  Failed:    { bg: '#FEE2E2', color: '#DC2626' },
  Refunded:  { bg: '#DBEAFE', color: '#1E40AF' },
}

const PAGE_SIZE = 8

// ── Main Page ─────────────────────────────────────────────────────────────────
const PaymentsPage = () => {
  const [methodFilter, setMethodFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return paymentsSeed.filter((p) => {
      if (methodFilter && p.method !== methodFilter) return false
      if (statusFilter && p.status !== statusFilter) return false
      return true
    })
  }, [methodFilter, statusFilter])

  const handleMethodChange = (v: string) => { setMethodFilter(v ?? ''); setPage(1) }
  const handleStatusChange = (v: string) => { setStatusFilter(v ?? ''); setPage(1) }

  const columns: ColumnsType<Payment> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{date}</span>
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
      title: 'Invoice',
      dataIndex: 'invoice',
      key: 'invoice',
      render: (invoice: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{invoice}</span>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <span className="text-sm text-text-primary font-semibold whitespace-nowrap">
          ${amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      render: (method: PaymentMethod) => (
        <span className="inline-block px-3 py-[3px] rounded-pill bg-[#F1F5F9] text-text-secondary text-[13px] font-medium whitespace-nowrap">
          {method}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: PaymentStatus) => (
        <span
          className="inline-block px-3.5 py-1 rounded-pill text-[13px] font-semibold whitespace-nowrap"
          style={{ background: STATUS_STYLE[status].bg, color: STATUS_STYLE[status].color }}
        >
          {status}
        </span>
      ),
    },
  ]

  return (
    <div className="px-8 py-7">
      <div className="bg-white rounded-[14px] border border-border-light overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between gap-4">
          <span className="text-lg font-bold" style={{ color: '#1b3a5c' }}>Payments</span>

          <div className="flex gap-2.5">
            <Select
              value={methodFilter || undefined}
              placeholder="All Methods"
              options={methodOptions}
              onChange={handleMethodChange}
              allowClear
              style={{ width: 160, height: 36 }}
            />
            <Select
              value={statusFilter || undefined}
              placeholder="All Statuses"
              options={statusOptions}
              onChange={handleStatusChange}
              allowClear
              style={{ width: 160, height: 36 }}
            />
          </div>
        </div>

        {/* Table */}
        <Table<Payment>
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: 'No payments found.' }}
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

export default PaymentsPage
