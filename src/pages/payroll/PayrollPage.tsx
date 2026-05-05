import { Navigate, Route, Routes } from 'react-router-dom'
import PayrollDashboard from './PayrollDashboard'
import PayrollEmployees from './PayrollEmployees'
import PayrollTimesheets from './PayrollTimesheets'
import PayrollRunPayroll from './PayrollRunPayroll'
import PayrollPayStubs from './PayrollPayStubs'
import PayrollReports from './PayrollReports'

const PayrollPage = () => (
  <div className="px-8 py-7">
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<PayrollDashboard />} />
      <Route path="employees" element={<PayrollEmployees />} />
      <Route path="timesheets" element={<PayrollTimesheets />} />
      <Route path="run-payroll" element={<PayrollRunPayroll />} />
      <Route path="pay-stubs" element={<PayrollPayStubs />} />
      <Route path="reports" element={<PayrollReports />} />
    </Routes>
  </div>
)

export default PayrollPage
