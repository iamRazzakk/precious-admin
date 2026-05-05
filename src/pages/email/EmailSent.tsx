import { EmailFolderView } from './EmailInbox'

const EmailSent = () => (
  <div>
    <h2 className="text-base font-bold mb-4" style={{ color: '#1b3a5c' }}>Sent</h2>
    <EmailFolderView folder="sent" emptyText="No sent messages." />
  </div>
)

export default EmailSent
