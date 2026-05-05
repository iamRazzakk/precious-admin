import { useMemo, useState } from 'react'
import { Button, Table, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Play } from 'lucide-react'
import { currentPayPeriod, type PayPeriodEntry } from '@/data/payroll'

const formatRange = (startIso: string, endIso: string) => {
  const start = new Date(startIso + 'T00:00:00')
  const end = new Date(endIso + 'T00:00:00')
  const startStr = start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  const endStr = end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${startStr} - ${endStr}`
}

const PayrollRunPayroll = () => {
  const eligible = useMemo(
    () => currentPayPeriod.entries.filter((e) => e.status === 'Approved'),
    [],
  )
  const [selected, setSelected] = useState<number[]>(eligible.map((e) => e.id))

  const totalGross = eligible
    .filter((e) => selected.includes(e.id))
    .reduce((sum, e) => sum + e.hours * e.rate, 0)

  const handleRun = () => {
    if (selected.length === 0) {
      message.warning('Select at least one employee to run payroll.')
      return
    }
    message.success(`Payroll run for ${selected.length} employee(s) - $${totalGross.toFixed(2)} gross.`)
  }

  const columns: ColumnsType<PayPeriodEntry> = [
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
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      render: (rate: number) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">${rate.toFixed(2)}</span>
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
      title: 'Gross Pay',
      key: 'gross',
      render: (_, record) => (
        <span className="text-sm font-bold whitespace-nowrap" style={{ color: '#1b3a5c' }}>
          ${(record.hours * record.rate).toFixed(2)}
        </span>
      ),
    },
  ]

  return (
    <div>
      <h2 className="text-base font-bold mb-4" style={{ color: '#1b3a5c' }}>Run Payroll</h2>

      <div className="bg-white rounded-[14px] border border-border-light overflow-hidden">
        <div className="px-6 pt-5 pb-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-base font-bold" style={{ color: '#1b3a5c' }}>
              Pay Period: {formatRange(currentPayPeriod.start, currentPayPeriod.end)}
            </div>
            <div className="text-xs text-text-muted mt-1">
              {eligible.length} approved timesheet{eligible.length === 1 ? '' : 's'} ready to process
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-text-muted">Selected total: </span>
              <span className="font-bold" style={{ color: '#1b3a5c' }}>
                ${totalGross.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <Button
              type="primary"
              icon={<Play size={14} />}
              onClick={handleRun}
              style={{ background: '#1b3a5c', borderColor: '#1b3a5c', height: 38, fontWeight: 600 }}
            >
              Run Payroll
            </Button>
          </div>
        </div>

        <Table<PayPeriodEntry>
          columns={columns}
          dataSource={eligible}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: 'No approved timesheets for this pay period.' }}
          pagination={false}
          rowSelection={{
            selectedRowKeys: selected,
            onChange: (keys) => setSelected(keys as number[]),
          }}
        />
      </div>
    </div>
  )
}

export default PayrollRunPayroll
