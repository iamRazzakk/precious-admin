import { Navigate, Route, Routes } from 'react-router-dom'
import SchedulingDashboard from './SchedulingDashboard'
import SchedulingCalendar from './SchedulingCalendar'
import SchedulingShifts from './SchedulingShifts'

const SchedulingPage = () => (
  <div className="px-8 py-7">
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<SchedulingDashboard />} />
      <Route path="calendar" element={<SchedulingCalendar />} />
      <Route path="shifts" element={<SchedulingShifts />} />
    </Routes>
  </div>
)

export default SchedulingPage
