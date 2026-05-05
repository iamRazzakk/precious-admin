import { LucideIcon } from 'lucide-react'
import { colors } from '@/utils/colors'
import { useHover } from '@/hooks/useHover'

interface StatCardProps {
  Icon: LucideIcon
  iconBg: string
  iconColor: string
  label: string
  value: string | number
  valueColor?: string
  badge?: string
  badgeTone?: 'success' | 'warning' | 'danger' | 'info'
}

const toneStyles = {
  success: { bg: colors.successLight, text: colors.successText },
  warning: { bg: colors.warningLight, text: colors.warningText },
  danger: { bg: colors.dangerLight, text: colors.dangerText },
  info: { bg: colors.infoLight, text: colors.infoText },
}

const StatCard = ({ Icon, iconBg, iconColor, label, value, valueColor, badge, badgeTone = 'info' }: StatCardProps) => {
  const { isHovered, hoverProps } = useHover()
  const tone = toneStyles[badgeTone]

  return (
    <div
      {...hoverProps}
      className={`bg-bg-card rounded-2xl border border-border-light p-5 transition-all duration-150 ${
        isHovered ? '-translate-y-0.5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]' : 'translate-y-0 shadow-none'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: iconBg, color: iconColor }}
        >
          <Icon size={20} />
        </div>
        {badge && (
          <span
            className="px-2.5 py-[3px] rounded-pill text-[11px] font-bold tracking-[0.3px]"
            style={{ background: tone.bg, color: tone.text }}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="text-xs text-text-secondary font-medium mb-1">{label}</div>
      <div
        className="text-[26px] font-bold tracking-[-0.3px] leading-[1.2]"
        style={{ color: valueColor || colors.textPrimary }}
      >
        {value}
      </div>
    </div>
  )
}

export default StatCard
