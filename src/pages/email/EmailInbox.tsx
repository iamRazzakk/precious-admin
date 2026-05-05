import { useState } from 'react'
import { Modal } from 'antd'
import { emailsSeed, type EmailMessage } from '@/data/emails'

const initial = (name: string) => name.trim().charAt(0).toUpperCase()

const EmailListItem = ({ email, onClick }: { email: EmailMessage; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full bg-white rounded-[14px] border border-border-light px-5 py-4 text-left cursor-pointer flex items-start gap-4 transition-colors duration-150 hover:bg-bg-subtle font-[inherit]"
  >
    <div
      className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold"
      style={{ background: '#1b3a5c' }}
    >
      {initial(email.from === 'me' ? email.to : email.from)}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-bold text-text-primary truncate">
        {email.from === 'me' ? `To: ${email.to}` : email.from}
      </div>
      <div className="text-[13px] mt-0.5 truncate" style={{ color: '#1b3a5c' }}>
        {email.subject}
      </div>
      <div className="text-xs text-text-muted mt-1 truncate">
        {email.preview}
      </div>
    </div>
    <div className="text-xs text-text-muted whitespace-nowrap pl-2">
      {email.date}
    </div>
  </button>
)

export const EmailDetailModal = ({
  email,
  open,
  onClose,
}: {
  email: EmailMessage | null
  open: boolean
  onClose: () => void
}) => (
  <Modal
    open={open}
    onCancel={onClose}
    footer={null}
    width={560}
    destroyOnHidden
    title={
      email ? (
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ background: '#1b3a5c' }}
          >
            {initial(email.from === 'me' ? email.to : email.from)}
          </div>
          <div>
            <div className="text-sm font-bold text-text-primary">
              {email.from === 'me' ? `To: ${email.to}` : email.from}
            </div>
            <div className="text-xs text-text-muted">
              To: {email.to} • {email.date} {email.time}
            </div>
          </div>
        </div>
      ) : null
    }
  >
    {email && (
      <>
        <div className="text-base font-bold mt-2 mb-3" style={{ color: '#0F172A' }}>
          {email.subject}
        </div>
        <div className="text-sm text-text-secondary whitespace-pre-line leading-relaxed">
          {email.body}
        </div>
      </>
    )}
  </Modal>
)

export const EmailFolderView = ({
  folder,
  emptyText,
}: {
  folder: 'inbox' | 'sent' | 'drafts' | 'announcements'
  emptyText: string
}) => {
  const [selected, setSelected] = useState<EmailMessage | null>(null)
  const list = emailsSeed.filter((e) => e.folder === folder)

  return (
    <div className="flex flex-col gap-3">
      {list.length === 0 ? (
        <div className="bg-white rounded-[14px] border border-border-light px-6 py-12 text-center text-text-muted text-sm">
          {emptyText}
        </div>
      ) : (
        list.map((e) => <EmailListItem key={e.id} email={e} onClick={() => setSelected(e)} />)
      )}

      <EmailDetailModal email={selected} open={!!selected} onClose={() => setSelected(null)} />
    </div>
  )
}

const EmailInbox = () => (
  <div>
    <h2 className="text-base font-bold mb-4" style={{ color: '#1b3a5c' }}>Inbox</h2>
    <EmailFolderView folder="inbox" emptyText="No messages in your inbox." />
  </div>
)

export default EmailInbox
