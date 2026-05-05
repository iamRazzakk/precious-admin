import { EmailFolderView } from './EmailInbox'

const EmailDrafts = () => (
  <div>
    <h2 className="text-base font-bold mb-4" style={{ color: '#1b3a5c' }}>Drafts</h2>
    <EmailFolderView folder="drafts" emptyText="No drafts saved." />
  </div>
)

export default EmailDrafts
