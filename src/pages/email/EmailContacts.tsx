import { emailContactsSeed } from '@/data/emails'

const EmailContacts = () => (
  <div>
    <h2 className="text-base font-bold mb-4" style={{ color: '#1b3a5c' }}>Contacts</h2>
    <div className="bg-white rounded-[14px] border border-border-light overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-t border-b border-border-light bg-bg-subtle">
              {['Name', 'Role', 'Email', 'Phone'].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-[0.05em] whitespace-nowrap"
                  style={{ color: '#2D7D7D' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {emailContactsSeed.map((c) => (
              <tr key={c.id} className="border-b border-border-light">
                <td className="px-5 py-4 text-sm font-bold text-text-primary whitespace-nowrap">
                  {c.name}
                </td>
                <td className="px-5 py-4 text-sm text-text-secondary whitespace-nowrap">
                  {c.role}
                </td>
                <td className="px-5 py-4 text-sm text-text-secondary whitespace-nowrap">
                  {c.email}
                </td>
                <td className="px-5 py-4 text-sm text-text-secondary whitespace-nowrap">
                  {c.phone ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

export default EmailContacts
