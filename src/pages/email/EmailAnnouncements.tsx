import { EmailFolderView } from './EmailInbox'

const EmailAnnouncements = () => (
  <div>
    <h2 className="text-base font-bold mb-4" style={{ color: '#1b3a5c' }}>Announcements</h2>
    <EmailFolderView folder="announcements" emptyText="No announcements." />
  </div>
)

export default EmailAnnouncements
