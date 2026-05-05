import { useState } from 'react'
import { Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Eye } from 'lucide-react'
import { payStubsSeed, type PayStub, type PayStubStatus } from '@/data/payroll'

const STATUS_STYLE: Record<PayStubStatus, { bg: string; color: string }> = {
  Issued:  { bg: '#D1FAE5', color: '#065F46' },
  Pending: { bg: '#FEF3C7', color: '#92400E' },
}

const PAGE_SIZE = 8

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const formatRange = (startIso: string, endIso: string) =>
  `${formatDate(startIso)} - ${formatDate(endIso)}`

const formatMoney = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const PayStubModal = ({ stub, open, onClose }: { stub: PayStub | null; open: boolean; onClose: () => void }) => (
  <Modal
    open={open}
    onCancel={onClose}
    footer={null}
    width={500}
    destroyOnHidden
    title={
      stub ? (
        <div>
          <div className="text-sm font-bold text-text-primary">{stub.employeeName}</div>
          <div className="text-xs text-text-muted">{stub.role} • Pay stub #{stub.id}</div>
        </div>
      ) : null
    }
  >
    {stub && (
      <div className="text-sm">
        <div className="mb-3 text-xs text-text-muted">
          Pay period: {formatRange(stub.periodStart, stub.periodEnd)}
        </div>

        <div className="border-t border-border-light pt-3 space-y-2">
          <div className="flex justify-between">
            <span className="text-text-secondary">Hours worked</span>
            <span className="font-medium">{stub.hours}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Rate</span>
            <span className="font-medium">{formatMoney(stub.rate)} / hr</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Gross pay</span>
            <span className="font-medium">{formatMoney(stub.gross)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Taxes & deductions</span>
            <span className="font-medium">- {formatMoney(stub.taxes)}</span>
          </div>
          <div className="flex justify-between border-t border-border-light pt-2 mt-2">
            <span className="font-bold" style={{ color: '#1b3a5c' }}>Net pay</span>
            <span className="font-bold" style={{ color: '#1b3a5c' }}>{formatMoney(stub.net)}</span>
          </div>
        </div>

        <div className="mt-4 text-xs text-text-muted">
          Issued: {formatDate(stub.issuedDate)}
        </div>
      </div>
    )}
  </Modal>
)

const PayrollPayStubs = () => {
  const [selected, setSelected] = useState<PayStub | null>(null)
  const [page, setPage] = useState(1)

  const columns: ColumnsType<PayStub> = [
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
      title: 'Pay Period',
      key: 'period',
      render: (_, record) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">
          {formatRange(record.periodStart, record.periodEnd)}
        </span>
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
      title: 'Gross',
      dataIndex: 'gross',
      key: 'gross',
      render: (gross: number) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{formatMoney(gross)}</span>
      ),
    },
    {
      title: 'Taxes',
      dataIndex: 'taxes',
      key: 'taxes',
      render: (taxes: number) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{formatMoney(taxes)}</span>
      ),
    },
    {
      title: 'Net',
      dataIndex: 'net',
      key: 'net',
      render: (net: number) => (
        <span className="text-sm font-bold whitespace-nowrap" style={{ color: '#1b3a5c' }}>
          {formatMoney(net)}
        </span>
      ),
    },
    {
      title: 'Issued',
      dataIndex: 'issuedDate',
      key: 'issuedDate',
      render: (issuedDate: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{formatDate(issuedDate)}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: PayStubStatus) => {
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
      title: '',
      key: 'actions',
      render: (_, record) => (
        <button
          title="View pay stub"
          onClick={() => setSelected(record)}
          className="w-8 h-8 rounded-lg border-0 bg-primary-light text-primary cursor-pointer flex items-center justify-center"
        >
          <Eye size={14} />
        </button>
      ),
    },
  ]

  return (
    <div>
      <h2 className="text-base font-bold mb-4" style={{ color: '#1b3a5c' }}>Pay Stubs</h2>
      <div className="bg-white rounded-[14px] border border-border-light overflow-hidden">
        <Table<PayStub>
          columns={columns}
          dataSource={payStubsSeed}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: 'No pay stubs found.' }}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total: payStubsSeed.length,
            onChange: (p) => setPage(p),
            showSizeChanger: false,
            hideOnSinglePage: true,
            position: ['bottomRight'],
          }}
        />
      </div>

      <PayStubModal stub={selected} open={!!selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default PayrollPayStubs
