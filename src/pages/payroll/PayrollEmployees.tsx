import { useState } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { payrollEmployees, type PayrollEmployee } from '@/data/payroll'

const STATUS_STYLE: Record<PayrollEmployee['status'], { bg: string; color: string }> = {
  Active:     { bg: '#D1FAE5', color: '#065F46' },
  'On Leave': { bg: '#FEF3C7', color: '#92400E' },
  Terminated: { bg: '#FEE2E2', color: '#991B1B' },
}

const PAGE_SIZE = 8

const formatHireDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const PayrollEmployees = () => {
  const [page, setPage] = useState(1)

  const columns: ColumnsType<PayrollEmployee> = [
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
      title: 'Pay Type',
      dataIndex: 'payType',
      key: 'payType',
      render: (payType: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{payType}</span>
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
      title: 'Hire Date',
      dataIndex: 'hireDate',
      key: 'hireDate',
      render: (hireDate: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{formatHireDate(hireDate)}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: PayrollEmployee['status']) => {
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
    <div>
      <h2 className="text-base font-bold mb-4" style={{ color: '#1b3a5c' }}>Employees</h2>
      <div className="bg-white rounded-[14px] border border-border-light overflow-hidden">
        <Table<PayrollEmployee>
          columns={columns}
          dataSource={payrollEmployees}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: 'No employees found.' }}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total: payrollEmployees.length,
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

export default PayrollEmployees
