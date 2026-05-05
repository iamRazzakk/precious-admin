import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ProtectedRoute from './ProtectedRoute'

// Auth pages
import LoginPage from '@/pages/auth/LoginPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import VerifyOtpPage from '@/pages/auth/VerifyOtpPage'
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage'

// Dashboard page
import DashboardPage from '@/pages/dashboard/DashboardPage'
import StaffPage from '@/pages/staff/StaffPage'
import ClientsPage from '@/pages/clients/ClientsPage'
import JobPostsPage from '@/pages/job-posts/JobPostsPage'
import ShiftHistoryPage from '@/pages/shift-history/ShiftHistoryPage'
import ApplicationsPage from '@/pages/applications/ApplicationsPage'
import InquiriesPage from '@/pages/inquiries/InquiriesPage'
import PaymentsPage from '@/pages/payments/PaymentsPage'
import HiringPage from '@/pages/hiring/HiringPage'
import SchedulingPage from '@/pages/scheduling/SchedulingPage'
import EmailPage from '@/pages/email/EmailPage'
import PayrollPage from '@/pages/payroll/PayrollPage'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected routes - nested under DashboardLayout */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/job-posts" element={<JobPostsPage />} />
        <Route path="/shift-history" element={<ShiftHistoryPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/inquiries" element={<InquiriesPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/hiring" element={<HiringPage />} />
        <Route path="/scheduling/*" element={<SchedulingPage />} />
        <Route path="/email/*" element={<EmailPage />} />
        <Route path="/payroll/*" element={<PayrollPage />} />
      </Route>

      {/* Defaults */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default AppRoutes
