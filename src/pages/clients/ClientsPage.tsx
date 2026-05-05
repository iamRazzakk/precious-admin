import { useState } from 'react'
import { Select, Popconfirm, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Card } from '@/components/common'
import { PrimaryButton } from '@/components/common/Buttons'
import { ClientFormModal } from '@/components/modal'
import type { ClientFormValues } from '@/components/modal'
import { clientsSeed } from '@/data/clients'
import type { Client, ClientStatus, ServicePlan } from '@/types'

// ── Constants ────────────────────────────────────────────────────────────────
const STATUS_OPTIONS = [
  'Active', 'Has Appointment', 'Hospitalized', 'Service Rescheduled', 'Inactive',
].map((s) => ({ label: s, value: s }))

const SERVICE_PLAN_COLORS: Record<ServicePlan, { bg: string; color: string }> = {
  'Personal Care':         { bg: '#D1FAE5', color: '#065F46' },
  'Medication Management': { bg: '#DBEAFE', color: '#1E40AF' },
  'Companion Care':        { bg: '#CCFBF1', color: '#0F766E' },
  'Nursing Services':      { bg: '#EDE9FE', color: '#5B21B6' },
  'Specialized Care':      { bg: '#FCE7F3', color: '#9D174D' },
  'Homemaker Services':    { bg: '#FEF3C7', color: '#92400E' },
  'Respite Care':          { bg: '#FEE2E2', color: '#991B1B' },
  'Dementia Care':         { bg: '#F3E8FF', color: '#6B21A8' },
}

// ── Badges ───────────────────────────────────────────────────────────────────
const PlanBadge = ({ plan }: { plan: ServicePlan }) => {
  const { bg, color } = SERVICE_PLAN_COLORS[plan]
  return (
    <span
      className="inline-block px-2.5 py-[3px] rounded-pill text-xs font-semibold whitespace-nowrap"
      style={{ background: bg, color }}
    >
      {plan}
    </span>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
let nextId = 7

type ModalState = { type: 'none' } | { type: 'add' } | { type: 'edit'; client: Client }

const PAGE_SIZE = 5

const emptyInitial: ClientFormValues = {
  name: '', street: '', city: '', state: 'OR', zip: '',
  lat: '', lng: '', servicePlans: [], caregiver: undefined,
}

const editInitial = (c: Client): ClientFormValues => ({
  name: c.name, street: c.address.street, city: c.address.city,
  state: c.address.state, zip: c.address.zip,
  lat: c.address.lat, lng: c.address.lng,
  servicePlans: c.servicePlans,
  caregiver: c.caregiver === '—' ? undefined : c.caregiver,
})

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>(clientsSeed)
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const [page, setPage] = useState(1)

  const closeModal = () => setModal({ type: 'none' })

  const handleAdd = (v: ClientFormValues) => {
    setClients((p) => [
      ...p,
      {
        id: nextId++,
        name: v.name.trim(),
        servicePlans: v.servicePlans?.length ? v.servicePlans : ['Personal Care'],
        startDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Active',
        caregiver: v.caregiver ?? '—',
        address: {
          street: v.street.trim(), city: v.city.trim(),
          state: v.state.trim(), zip: v.zip.trim(),
          lat: v.lat?.trim() ?? '', lng: v.lng?.trim() ?? '',
        },
      },
    ])
    closeModal()
  }

  const handleEdit = (v: ClientFormValues) => {
    if (modal.type !== 'edit') return
    setClients((p) =>
      p.map((c) =>
        c.id === modal.client.id
          ? {
              ...c,
              name: v.name.trim(),
              servicePlans: v.servicePlans?.length ? v.servicePlans : c.servicePlans,
              caregiver: v.caregiver ?? c.caregiver,
              address: {
                street: v.street.trim(), city: v.city.trim(),
                state: v.state.trim(), zip: v.zip.trim(),
                lat: v.lat?.trim() ?? c.address.lat,
                lng: v.lng?.trim() ?? c.address.lng,
              },
            }
          : c,
      ),
    )
    closeModal()
  }

  const updateStatus = (id: number, status: ClientStatus) =>
    setClients((p) => p.map((c) => (c.id === id ? { ...c, status } : c)))

  const deleteClient = (id: number) =>
    setClients((p) => p.filter((c) => c.id !== id))

  const clientColumns: ColumnsType<Client> = [
    {
      title: 'Name',
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
      render: (plans: ServicePlan[]) => (
        <div className="flex flex-wrap gap-1.5">
          {plans.map((p) => <PlanBadge key={p} plan={p} />)}
        </div>
      ),
    },
    {
      title: 'Start',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (startDate: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{startDate}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: ClientStatus, c) => (
        <Select
          value={status}
          options={STATUS_OPTIONS}
          onChange={(s: ClientStatus) => updateStatus(c.id, s)}
          style={{ width: 170 }}
          size="small"
        />
      ),
    },
    {
      title: 'Caregiver',
      dataIndex: 'caregiver',
      key: 'caregiver',
      render: (caregiver: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{caregiver}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, c) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setModal({ type: 'edit', client: c })}
            title="Edit"
            className="w-8 h-8 rounded-lg border-0 bg-primary-light text-primary cursor-pointer flex items-center justify-center"
          >
            <Pencil size={14} />
          </button>
          <Popconfirm
            title="Delete Client"
            description={`Are you sure you want to delete "${c.name}"?`}
            onConfirm={() => deleteClient(c.id)}
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
    <div className="px-8 py-7">
      <Card padding={0}>
        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
          <span className="text-base font-bold text-text-primary">Client Management</span>
          <PrimaryButton Icon={Plus} label="Add Client" onClick={() => setModal({ type: 'add' })} />
        </div>

        {/* Table */}
        <Table<Client>
          columns={clientColumns}
          dataSource={clients}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: 'No clients found.' }}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total: clients.length,
            onChange: (p) => setPage(p),
            showSizeChanger: false,
            hideOnSinglePage: true,
            position: ['bottomRight'],
          }}
        />
      </Card>

      {/* ── Modals ─────────────────────────────────────────────────────── */}
      <ClientFormModal
        title="Add New Client"
        open={modal.type === 'add'}
        initial={emptyInitial}
        onSave={handleAdd}
        onClose={closeModal}
      />

      <ClientFormModal
        title="Edit Client"
        open={modal.type === 'edit'}
        initial={modal.type === 'edit' ? editInitial(modal.client) : emptyInitial}
        onSave={handleEdit}
        onClose={closeModal}
      />
    </div>
  )
}

export default ClientsPage
