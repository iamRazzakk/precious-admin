import { Drawer, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { X } from 'lucide-react'
import { clientsSeed } from '@/data/clients'
import type { Client, ServicePlan, StaffMember } from '@/types'

const PLAN_COLORS: Record<ServicePlan, { bg: string; color: string }> = {
  'Personal Care':         { bg: '#D1FAE5', color: '#065F46' },
  'Medication Management': { bg: '#DBEAFE', color: '#1E40AF' },
  'Companion Care':        { bg: '#CCFBF1', color: '#0F766E' },
  'Nursing Services':      { bg: '#EDE9FE', color: '#5B21B6' },
  'Specialized Care':      { bg: '#FCE7F3', color: '#9D174D' },
  'Homemaker Services':    { bg: '#FEF3C7', color: '#92400E' },
  'Respite Care':          { bg: '#FEE2E2', color: '#991B1B' },
  'Dementia Care':         { bg: '#F3E8FF', color: '#6B21A8' },
}

interface StaffClientsDrawerProps {
  staff: StaffMember | null
  onClose: () => void
}

const StaffClientsDrawer = ({ staff, onClose }: StaffClientsDrawerProps) => {
  const clients = staff ? clientsSeed.filter((c) => c.caregiver === staff.name) : []

  const columns: ColumnsType<Client> = [
    {
      title: 'Client Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <span className="text-sm font-bold text-text-primary whitespace-nowrap">{name}</span>
      ),
    },
    {
      title: 'Service Plans',
      dataIndex: 'servicePlans',
      key: 'servicePlans',
      width: 260,
      render: (plans: ServicePlan[]) => (
        <div className="flex flex-wrap gap-[5px]">
          {plans.map((p) => {
            const { bg, color } = PLAN_COLORS[p]
            return (
              <span
                key={p}
                className="px-[9px] py-[3px] rounded-pill text-[11px] font-semibold"
                style={{ background: bg, color }}
              >
                {p}
              </span>
            )
          })}
        </div>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (startDate: string) => (
        <span className="text-[13px] text-text-secondary whitespace-nowrap">{startDate}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className="text-[13px] text-text-secondary">{status}</span>
      ),
    },
  ]

  return (
    <Drawer
      title={staff ? <span className="font-bold">{staff.name} — Assigned Clients</span> : null}
      open={!!staff}
      onClose={onClose}
      width={700}
      closable={false}
      extra={
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-8 h-8 rounded-lg border-0 bg-transparent text-text-secondary cursor-pointer flex items-center justify-center hover:bg-bg-subtle"
        >
          <X size={18} />
        </button>
      }
      styles={{ body: { padding: 0 } }}
    >
      {staff && (
        <Table<Client>
          columns={columns}
          dataSource={clients}
          rowKey="id"
          pagination={false}
          locale={{ emptyText: `No clients assigned to ${staff.name}.` }}
        />
      )}
    </Drawer>
  )
}

export default StaffClientsDrawer
