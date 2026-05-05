import { LucideIcon } from 'lucide-react'

interface PaginationButtonProps {
  Icon: LucideIcon
  onClick?: () => void
  disabled?: boolean
}

const PaginationButton = ({ Icon, onClick, disabled }: PaginationButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-[34px] h-[34px] rounded-lg border border-border bg-bg-card flex items-center justify-center transition-all duration-150 ${
      disabled ? 'text-text-muted cursor-not-allowed opacity-50' : 'text-text-primary cursor-pointer'
    }`}
  >
    <Icon size={16} />
  </button>
)

export default PaginationButton
