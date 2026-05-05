import { Modal, Button } from 'antd'
import { colors } from '@/utils/colors'

interface ConfirmModalProps {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal = ({ open, title, message, confirmLabel, danger, onConfirm, onCancel }: ConfirmModalProps) => (
  <Modal
    title={<span className="text-[17px] font-bold">{title}</span>}
    open={open}
    onCancel={onCancel}
    width={420}
    destroyOnHidden
    footer={
      <div className="flex gap-2 justify-end">
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          type="primary"
          danger={danger}
          onClick={onConfirm}
          style={!danger ? { background: colors.primary, borderColor: colors.primary } : undefined}
        >
          {confirmLabel}
        </Button>
      </div>
    }
  >
    <p className="text-sm text-text-secondary leading-[1.6] m-0">{message}</p>
  </Modal>
)

export default ConfirmModal
