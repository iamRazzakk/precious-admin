import { Bell, Search } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useNotifications } from '@/context/NotificationsContext'

const TopBar = () => {
  const { user } = useAuth()
  const { unreadCount } = useNotifications()

  return (
    <div className="h-20 bg-bg-card border-b border-border-light flex items-center gap-5 px-7 sticky top-0 z-10">
      {/* Search */}
      <div className="flex-1 max-w-[520px] relative flex items-center">
        <Search size={16} className="absolute left-4 pointer-events-none text-text-muted" />
        <input
          placeholder="Search reports, users, or logs..."
          className="w-full h-[42px] rounded-pill border-0 bg-bg-input pl-[42px] pr-4 text-sm text-text-primary outline-none font-[inherit]"
        />
      </div>

      <div className="flex-1" />

      {/* Notification bell */}
      <button
        title="Notifications"
        className="w-10 h-10 rounded-pill border-0 bg-transparent cursor-pointer flex items-center justify-center text-text-secondary relative"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span
            className={`absolute top-1.5 min-w-[18px] h-[18px] px-[5px] rounded-pill bg-danger text-white text-[10px] font-bold flex items-center justify-center border-2 border-bg-card tabular-nums ${
              unreadCount > 9 ? 'right-1' : 'right-[7px]'
            }`}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Admin */}
      {user && (
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-bold text-text-primary">{user.name}</div>
            <div className="text-xs text-text-muted">{user.role}</div>
          </div>
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-border-light"
          />
        </div>
      )}
    </div>
  )
}

export default TopBar
