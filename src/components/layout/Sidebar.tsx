import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, type MenuProps } from 'antd'
import {
  LayoutDashboard,
  Users,
  UserRound,
  Briefcase,
  History,
  FileText,
  MessageCircle,
  CreditCard,
  UserPlus,
  CalendarDays,
  Mail,
  Wallet,
  LogOut,
} from 'lucide-react'
import Logo from '@/components/common/Logo'
import { useAuth } from '@/context/AuthContext'

type MenuItem = Required<MenuProps>['items'][number]

const NAV_ITEMS: MenuItem[] = [
  { key: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { key: '/staff', icon: <Users size={18} />, label: 'Staff Management' },
  { key: '/clients', icon: <UserRound size={18} />, label: 'Clients' },
  { key: '/job-posts', icon: <Briefcase size={18} />, label: 'Job Posts' },
  { key: '/shift-history', icon: <History size={18} />, label: 'Shift History' },
  { key: '/applications', icon: <FileText size={18} />, label: 'Applications' },
  { key: '/inquiries', icon: <MessageCircle size={18} />, label: 'Inquiries' },
  { key: '/payments', icon: <CreditCard size={18} />, label: 'Payments' },
  { key: '/hiring', icon: <UserPlus size={18} />, label: 'Hiring' },
  {
    key: '/scheduling',
    icon: <CalendarDays size={18} />,
    label: 'Scheduling',
    children: [
      { key: '/scheduling/dashboard', label: 'Dashboard' },
      { key: '/scheduling/calendar', label: 'Calendar' },
      { key: '/scheduling/shifts', label: 'Shifts' },
    ],
  },
  {
    key: '/email',
    icon: <Mail size={18} />,
    label: 'Email',
    children: [
      { key: '/email/inbox', label: 'Inbox' },
      { key: '/email/compose', label: 'Compose' },
      { key: '/email/sent', label: 'Sent' },
      { key: '/email/drafts', label: 'Drafts' },
      { key: '/email/contacts', label: 'Contacts' },
      { key: '/email/announcements', label: 'Announcements' },
    ],
  },
  {
    key: '/payroll',
    icon: <Wallet size={18} />,
    label: 'Payroll',
    children: [
      { key: '/payroll/dashboard', label: 'Dashboard' },
      { key: '/payroll/employees', label: 'Employees' },
      { key: '/payroll/timesheets', label: 'Timesheets' },
      { key: '/payroll/run-payroll', label: 'Run Payroll' },
      { key: '/payroll/pay-stubs', label: 'Pay Stubs' },
      { key: '/payroll/reports', label: 'Reports' },
    ],
  },
]

const PARENT_KEYS = ['/scheduling', '/email', '/payroll']

const Sidebar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const selectedKey = useMemo(() => {
    const path = location.pathname
    const allChildren = NAV_ITEMS.flatMap((i) =>
      i && 'children' in i && i.children ? i.children.map((c) => c!.key as string) : [],
    )
    const childMatch = allChildren.find((k) => path === k || path.startsWith(k + '/'))
    if (childMatch) return childMatch
    const topMatch = NAV_ITEMS.find(
      (i) => i && !('children' in i && i.children) && (path === i.key || path.startsWith(i.key + '/')),
    )
    return topMatch ? (topMatch.key as string) : path
  }, [location.pathname])

  const openKeys = useMemo(
    () => PARENT_KEYS.filter((k) => location.pathname.startsWith(k)),
    [location.pathname],
  )

  return (
    <aside className="w-[260px] bg-bg-card border-r border-border-light flex flex-col flex-shrink-0 h-screen sticky top-0">
      <div className="p-6 flex-shrink-0 flex items-center justify-center">
        <img
          src="/logo-icon.png"
          alt="logo-icon"
          className=" w-[80px] h-[80px] rounded-full object-cover border-2 border-border-light"
        />
      </div>

      <div className="flex-1 px-2 overflow-y-auto overflow-x-hidden">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={openKeys}
          items={NAV_ITEMS}
          onClick={({ key }) => navigate(key)}
          style={{ borderInlineEnd: 'none', background: 'transparent', fontSize: 14 }}
        />
      </div>

      <div className="px-3.5 pt-3 pb-3.5 border-t border-border-light flex-shrink-0">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-[11px] rounded-[10px] border-0 bg-transparent text-text-secondary text-sm font-medium cursor-pointer text-left font-[inherit] transition-[background] duration-150 hover:bg-bg-input"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
