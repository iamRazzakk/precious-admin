type ShiftEntry = {
  staff: string
  client: string
  time: string
  variant: 'blue' | 'yellow'
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const VARIANT_STYLES: Record<ShiftEntry['variant'], { bg: string; staff: string; client: string }> = {
  blue:   { bg: '#E8EEF7', staff: '#1b3a5c', client: '#3B5A82' },
  yellow: { bg: '#FAF3DC', staff: '#A07A1F', client: '#7A5E1A' },
}

const pad = (n: number) => String(n).padStart(2, '0')
const isoOf = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

const startOfWeekMonday = (d: Date) => {
  const out = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const day = out.getDay() // 0=Sun..6=Sat
  const diff = day === 0 ? -6 : 1 - day
  out.setDate(out.getDate() + diff)
  return out
}

const SHIFTS_BY_DATE: Record<string, ShiftEntry[]> = {
  // Monday
  mon: [
    { staff: 'Sarah', client: 'Martha', time: '08:00', variant: 'blue' },
    { staff: 'Maria', client: 'Robert', time: '14:00', variant: 'yellow' },
    { staff: 'David', client: 'Dorothy', time: '08:00', variant: 'blue' },
  ],
  // Tuesday
  tue: [
    { staff: 'Lisa', client: 'James', time: '22:00', variant: 'blue' },
    { staff: 'Amanda', client: 'Helen', time: '08:00', variant: 'blue' },
  ],
  // Wednesday
  wed: [
    { staff: 'James', client: 'Martha', time: '08:00', variant: 'blue' },
  ],
  thu: [],
  fri: [],
  sat: [],
  sun: [],
}

const SchedulingCalendar = () => {
  const today = new Date()
  const todayIso = isoOf(today)
  const weekStart = startOfWeekMonday(today)

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i)
    const key = WEEKDAY_LABELS[i].toLowerCase() as keyof typeof SHIFTS_BY_DATE
    return {
      label: WEEKDAY_LABELS[i],
      date: `${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
      iso: isoOf(d),
      shifts: SHIFTS_BY_DATE[key] || [],
    }
  })

  return (
    <div className="bg-[#F5F2EC] rounded-[14px] p-5">
      <h3 className="text-base font-bold mb-4" style={{ color: '#1b3a5c' }}>
        Week of {MONTHS[weekStart.getMonth()]} {weekStart.getDate()}, {weekStart.getFullYear()}
      </h3>

      <div className="grid grid-cols-7 gap-3">
        {days.map((day) => {
          const isToday = day.iso === todayIso
          return (
          <div
            key={day.iso}
            className={`rounded-[10px] p-3 min-h-[180px] ${
              isToday
                ? 'bg-white border-2 ring-2 ring-[#2D7D7D]/20 shadow-sm'
                : 'bg-white border border-border-light'
            }`}
            style={isToday ? { borderColor: '#2D7D7D' } : undefined}
          >
            <div
              className="text-[13px] font-bold mb-2.5"
              style={{ color: isToday ? '#2D7D7D' : '#1b3a5c' }}
            >
              {day.label} {day.date}
              {isToday && (
                <span
                  className="ml-1.5 inline-block px-1.5 py-px rounded-[4px] text-[10px] font-bold align-middle"
                  style={{ background: '#2D7D7D', color: '#fff' }}
                >
                  TODAY
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {day.shifts.map((s, i) => {
                const style = VARIANT_STYLES[s.variant]
                return (
                  <div
                    key={i}
                    className="rounded-[6px] px-2 py-1.5"
                    style={{ background: style.bg }}
                  >
                    <div className="text-[13px] font-bold leading-tight" style={{ color: style.staff }}>
                      {s.staff}
                    </div>
                    <div className="text-[12px] leading-tight mt-0.5" style={{ color: style.client }}>
                      {s.client} {s.time}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default SchedulingCalendar
