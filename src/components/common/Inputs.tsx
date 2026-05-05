import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { Eye, EyeOff, ChevronDown, LucideIcon } from 'lucide-react'

interface PillInputProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  iconRight?: LucideIcon
  iconLeft?: LucideIcon
  type?: string
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const PillInput = ({
  value,
  onChange,
  placeholder,
  iconRight: IconRight,
  iconLeft: IconLeft,
  type = 'text',
  onKeyDown,
}: PillInputProps) => {
  const [focused, setFocused] = useState(false)
  return (
    <div
      className={`relative h-[46px] rounded-pill transition-all duration-150 flex items-center border-2 ${
        focused ? 'bg-bg-card border-primary' : 'bg-bg-input border-transparent'
      }`}
    >
      {IconLeft && (
        <div className="absolute left-[18px] text-text-muted pointer-events-none flex">
          <IconLeft size={16} />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        className={`w-full h-full border-0 outline-none bg-transparent text-sm text-text-primary font-[inherit] rounded-pill font-medium ${
          IconLeft ? 'pl-11' : 'pl-5'
        } ${IconRight ? 'pr-11' : 'pr-5'}`}
      />
      {IconRight && (
        <div className="absolute right-[18px] text-text-muted pointer-events-none flex">
          <IconRight size={16} />
        </div>
      )}
    </div>
  )
}

interface PasswordInputProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export const PasswordInput = ({ value, onChange, placeholder }: PasswordInputProps) => {
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(false)
  return (
    <div
      className={`relative h-[46px] rounded-pill transition-all duration-150 flex items-center border-2 ${
        focused ? 'bg-bg-card border-primary' : 'bg-bg-input border-transparent'
      }`}
    >
      <input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full h-full border-0 outline-none bg-transparent pl-5 pr-11 text-sm text-text-primary font-[inherit] rounded-pill"
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        className="absolute right-4 bg-none border-0 text-text-muted cursor-pointer flex items-center p-1"
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  )
}

interface SelectPillProps {
  value: string
  onChange: (val: string) => void
  options: string[]
}

export const SelectPill = ({ value, onChange, options }: SelectPillProps) => (
  <div className="relative h-[46px]">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-full rounded-pill border-2 border-transparent bg-bg-input pl-5 pr-10 text-sm text-text-primary font-medium font-[inherit] cursor-pointer appearance-none outline-none"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <ChevronDown
      size={16}
      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted"
    />
  </div>
)

interface FieldProps {
  label: string
  children: React.ReactNode
  uppercaseLabel?: boolean
}

export const FieldWithLabel = ({ label, children, uppercaseLabel }: FieldProps) => (
  <div className="mb-3.5">
    <label
      className={`block mb-1.5 ${
        uppercaseLabel
          ? 'text-[11px] font-bold text-text-secondary tracking-[0.6px] uppercase'
          : 'text-[13px] font-semibold text-text-primary'
      }`}
    >
      {label}
    </label>
    {children}
  </div>
)
