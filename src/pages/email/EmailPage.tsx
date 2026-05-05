import { Navigate, Route, Routes } from 'react-router-dom'
import EmailInbox from './EmailInbox'
import EmailCompose from './EmailCompose'
import EmailSent from './EmailSent'
import EmailDrafts from './EmailDrafts'
import EmailContacts from './EmailContacts'
import EmailAnnouncements from './EmailAnnouncements'

const EmailPage = () => (
  <div className="px-8 py-7">
    <Routes>
      <Route index element={<Navigate to="inbox" replace />} />
      <Route path="inbox" element={<EmailInbox />} />
      <Route path="compose" element={<EmailCompose />} />
      <Route path="sent" element={<EmailSent />} />
      <Route path="drafts" element={<EmailDrafts />} />
      <Route path="contacts" element={<EmailContacts />} />
      <Route path="announcements" element={<EmailAnnouncements />} />
    </Routes>
  </div>
)

export default EmailPage
