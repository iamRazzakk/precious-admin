import { forwardRef, useState } from 'react'
import { Popconfirm, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Plus, Pencil, Trash2, ShieldOff, ShieldCheck, Users } from 'lucide-react'
import { Card, Badge } from '@/components/common'
import { PrimaryButton } from '@/components/common/Buttons'
import { StaffFormModal } from '@/components/modal'
import type { StaffFormValues } from '@/components/modal'
import { StaffClientsDrawer } from '@/components/drawer'
import { staffSeed } from '@/data/staff'
import { clientsSeed } from '@/data/clients'
import { colors } from '@/utils/colors'
import type { StaffMember, StaffStatus, StaffPosition } from '@/types'

// ── Status badge helper ──────────────────────────────────────────────────────
const statusBadge = (status: StaffStatus) => {
  const map: Record<StaffStatus, { bg: string; color: string }> = {
    Active: { bg: colors.successLight, color: colors.successText },
    'On Leave': { bg: '#FEF3C7', color: '#92400E' },
    Banned: { bg: colors.dangerLight, color: colors.dangerText },
  }
  const { bg, color } = map[status]
  return <Badge text={status} bg={bg} color={color} />
}

// ── Main Page ────────────────────────────────────────────────────────────────
type ModalState =
  | { type: 'none' }
  | { type: 'add' }
  | { type: 'edit'; staff: StaffMember }

let nextId = 9
const PAGE_SIZE = 5

const emptyInitial: StaffFormValues = {
  name: '',
  position: 'CNA',
  phone: '',
  email: '',
}

const editInitial = (s: StaffMember): StaffFormValues => ({
  name: s.name,
  position: s.position,
  phone: s.phone,
  email: s.email,
})

const StaffPage = () => {
  const [staff, setStaff] = useState<StaffMember[]>(staffSeed)
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const [page, setPage] = useState(1)
  const [drawerStaff, setDrawerStaff] = useState<StaffMember | null>(null)

  const closeModal = () => setModal({ type: 'none' })

  const handleAdd = (v: StaffFormValues) => {
    setStaff((p) => [
      ...p,
      {
        id: nextId++,
        ...v,
        status: 'Active',
        hireDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      },
    ])
    closeModal()
  }

  const handleEdit = (v: StaffFormValues) => {
    if (modal.type !== 'edit') return
    setStaff((p) => p.map((s) => (s.id === modal.staff.id ? { ...s, ...v } : s)))
    closeModal()
  }

  const handleDelete = (target: StaffMember) => {
    setStaff((p) => p.filter((s) => s.id !== target.id))
  }

  const handleBanToggle = (target: StaffMember) => {
    setStaff((p) =>
      p.map((s) =>
        s.id === target.id ? { ...s, status: s.status === 'Banned' ? 'Active' : 'Banned' } : s,
      ),
    )
  }

  const staffColumns: ColumnsType<StaffMember> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <span className="text-sm font-bold text-text-primary whitespace-nowrap">{name}</span>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (position: StaffPosition) => (
        <span className="text-sm text-text-secondary">{position}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: StaffStatus) => statusBadge(status),
    },
    {
      title: 'Hire Date',
      dataIndex: 'hireDate',
      key: 'hireDate',
      render: (hireDate: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{hireDate}</span>
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
      title: 'Clients',
      key: 'clients',
      render: (_, s) => {
        const clientCount = clientsSeed.filter((c) => c.caregiver === s.name).length
        return (
          <button
            onClick={() => setDrawerStaff(s)}
            className="inline-flex items-center gap-1.5 px-3 py-[5px] rounded-lg border-0 bg-bg-subtle text-text-secondary text-[13px] font-semibold cursor-pointer font-[inherit] transition-[background] duration-150 hover:bg-primary-light"
          >
            <Users size={13} />
            {clientCount} {clientCount === 1 ? 'Client' : 'Clients'}
          </button>
        )
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, s) => {
        const banned = s.status === 'Banned'
        return (
          <div className="flex items-center gap-1.5">
            <Popconfirm
              title={banned ? 'Unban Staff Member' : 'Ban Staff Member'}
              description={
                banned
                  ? `Unban "${s.name}"? Their status will be restored to Active.`
                  : `Ban "${s.name}"? They will lose access and be marked as Banned.`
              }
              okText={banned ? 'Unban' : 'Ban'}
              cancelText="Cancel"
              okButtonProps={{ danger: !banned }}
              onConfirm={() => handleBanToggle(s)}
            >
              <ActionBtn
                label={banned ? 'Unban' : 'Ban'}
                Icon={banned ? ShieldCheck : ShieldOff}
                color={banned ? colors.success : colors.warning}
                bg={banned ? colors.successLight : '#FEF3C7'}
              />
            </Popconfirm>
            <ActionBtn
              label="Edit"
              Icon={Pencil}
              color={colors.primary}
              bg={colors.primaryLight}
              onClick={() => setModal({ type: 'edit', staff: s })}
            />
            <Popconfirm
              title="Delete Staff Member"
              description={`Are you sure you want to permanently delete "${s.name}"?`}
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
              onConfirm={() => handleDelete(s)}
            >
              <ActionBtn
                label="Delete"
                Icon={Trash2}
                color={colors.danger}
                bg={colors.dangerLight}
              />
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  return (
    <div className="px-8 py-7">
      <Card padding={0}>
        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
          <span className="text-base font-bold text-text-primary">Staff Management</span>
          <PrimaryButton Icon={Plus} label="Add New Staff" onClick={() => setModal({ type: 'add' })} />
        </div>

        {/* Table */}
        <Table<StaffMember>
          columns={staffColumns}
          dataSource={staff}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: 'No staff members found.' }}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total: staff.length,
            onChange: (p) => setPage(p),
            showSizeChanger: false,
            hideOnSinglePage: true,
            position: ['bottomRight'],
          }}
        />
      </Card>

      {/* ── Client Drawer ───────────────────────────────────────────────── */}
      <StaffClientsDrawer staff={drawerStaff} onClose={() => setDrawerStaff(null)} />

      {/* ── Modals ─────────────────────────────────────────────────────── */}
      <StaffFormModal
        title="Add New Staff"
        open={modal.type === 'add'}
        initial={emptyInitial}
        onSave={handleAdd}
        onClose={closeModal}
      />

      <StaffFormModal
        title="Edit Staff"
        open={modal.type === 'edit'}
        initial={modal.type === 'edit' ? editInitial(modal.staff) : emptyInitial}
        onSave={handleEdit}
        onClose={closeModal}
      />

    </div>
  )
}

// ── Small action button ──────────────────────────────────────────────────────
interface ActionBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  Icon: React.ElementType
  color: string
  bg: string
}

const ActionBtn = forwardRef<HTMLButtonElement, ActionBtnProps>(
  ({ label, Icon, color, bg, ...rest }, ref) => (
    <button
      {...rest}
      ref={ref}
      title={label}
      className="inline-flex items-center gap-[5px] px-3 py-[5px] rounded-lg border-0 text-xs font-semibold cursor-pointer font-[inherit] transition-opacity duration-150 hover:opacity-80"
      style={{ background: bg, color }}
    >
      <Icon size={13} />
      {label}
    </button>
  ),
)

export default StaffPage
