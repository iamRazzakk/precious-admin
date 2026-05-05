export type EmailFolder = 'inbox' | 'sent' | 'drafts' | 'announcements'

export interface EmailMessage {
  id: number
  folder: EmailFolder
  from: string
  fromRole?: string
  to: string
  date: string
  time: string
  subject: string
  preview: string
  body: string
  read?: boolean
}

export interface EmailContact {
  id: number
  name: string
  role: string
  email: string
  phone?: string
}

export const emailsSeed: EmailMessage[] = [
  {
    id: 1,
    folder: 'inbox',
    from: 'Jennifer Adams (Scheduler)',
    fromRole: 'Scheduler',
    to: 'me',
    date: '2026-04-24',
    time: '09:12',
    subject: 'Schedule Update - Week of April 27',
    preview: 'Hi Team, Please review the updated schedule for next week. Key changes: - Sarah...',
    body: `Hi Team,

Please review the updated schedule for next week. Key changes:
- Sarah Mitchell will cover Monday morning shifts
- Carlos Mendez moves to evening rotation Wed-Fri
- New client intake on Tuesday at 10:00 AM

Let me know if you have any questions or conflicts.

Thanks,
Jennifer`,
  },
  {
    id: 2,
    folder: 'inbox',
    from: 'HR Department',
    fromRole: 'HR',
    to: 'All Staff',
    date: '2026-04-23',
    time: '14:15',
    subject: 'HIPAA Training Due by April 30',
    preview: 'Dear Team, This is a reminder that all staff must complete the annual HIPAA...',
    body: `Dear Team,

This is a reminder that all staff must complete the annual HIPAA compliance training by April 30, 2026.

Please log into the training portal to complete your modules.

Thank you,
HR Department`,
  },
  {
    id: 3,
    folder: 'inbox',
    from: 'David Thompson (RN)',
    fromRole: 'RN',
    to: 'me',
    date: '2026-04-23',
    time: '11:42',
    subject: 'Client Update - Robert Williams',
    preview: 'Hi Team, Just a quick update on Robert Williams: He has been making good progress...',
    body: `Hi Team,

Just a quick update on Robert Williams: He has been making good progress with his physical therapy and is now able to walk short distances with assistance.

Care plan updates have been added to the chart.

Best,
David`,
  },
  {
    id: 4,
    folder: 'inbox',
    from: 'Amanda Foster (LPN)',
    fromRole: 'LPN',
    to: 'Jennifer Adams',
    date: '2026-04-22',
    time: '08:03',
    subject: 'PTO Request - May 5-9',
    preview: 'Hi Jennifer, I would like to request PTO from May 5 to May 9. Please let me know if...',
    body: `Hi Jennifer,

I would like to request PTO from May 5 to May 9. Please let me know if coverage can be arranged.

Thanks,
Amanda`,
  },
  {
    id: 5,
    folder: 'inbox',
    from: 'Billing Department',
    fromRole: 'Billing',
    to: 'All Staff',
    date: '2026-04-21',
    time: '16:30',
    subject: 'Timesheet Reminder - Submit by Friday',
    preview: 'Hi Everyone, Please submit your timesheets for the current pay period by end of...',
    body: `Hi Everyone,

Please submit your timesheets for the current pay period by end of day Friday. Late submissions will be processed in the following pay cycle.

Thank you,
Billing`,
  },
  {
    id: 6,
    folder: 'sent',
    from: 'me',
    to: 'Jennifer Adams (Scheduler)',
    date: '2026-04-22',
    time: '10:05',
    subject: 'Re: Schedule Update - Week of April 27',
    preview: 'Thanks Jennifer, the changes look good to me. I confirm Tuesday intake.',
    body: `Thanks Jennifer,

The changes look good to me. I confirm I'll handle the Tuesday intake at 10:00 AM.

Best,
Admin`,
  },
  {
    id: 7,
    folder: 'sent',
    from: 'me',
    to: 'All Staff',
    date: '2026-04-20',
    time: '15:20',
    subject: 'Monthly Team Meeting - May 1',
    preview: 'Reminder: monthly team meeting will be held on Friday May 1 at 2 PM in the main office.',
    body: `Hello team,

Reminder: monthly team meeting will be held on Friday May 1 at 2 PM in the main office. Agenda will be shared the day before.

Thanks,
Admin`,
  },
  {
    id: 8,
    folder: 'drafts',
    from: 'me',
    to: 'David Thompson (RN)',
    date: '2026-04-23',
    time: '17:45',
    subject: 'Follow-up on Robert Williams care plan',
    preview: 'Hi David, following up on the care plan updates you sent earlier...',
    body: `Hi David,

Following up on the care plan updates you sent earlier — could you confirm whether PT sessions need to increase next week?

[Draft - not yet sent]`,
  },
  {
    id: 9,
    folder: 'announcements',
    from: 'Operations',
    fromRole: 'Ops',
    to: 'All Staff',
    date: '2026-04-19',
    time: '09:00',
    subject: 'Office Closed Memorial Day - May 25',
    preview: 'Please note the office will be closed on Memorial Day, May 25. On-call staff only.',
    body: `Team,

Please note the office will be closed on Memorial Day, May 25. On-call staff only. Emergency contacts remain the same.

Thank you,
Operations`,
  },
  {
    id: 10,
    folder: 'announcements',
    from: 'Compliance',
    fromRole: 'Compliance',
    to: 'All Staff',
    date: '2026-04-15',
    time: '13:25',
    subject: 'New Incident Reporting Procedure',
    preview: 'Effective May 1, all incident reports must be submitted through the new portal.',
    body: `Team,

Effective May 1, all incident reports must be submitted through the new portal. Documentation and training links are available on the staff intranet.

Thank you,
Compliance`,
  },
]

export const emailContactsSeed: EmailContact[] = [
  { id: 1, name: 'Jennifer Adams',   role: 'Scheduler',  email: 'jennifer.adams@preciouscare.com', phone: '(503) 555-0142' },
  { id: 2, name: 'David Thompson',   role: 'RN',         email: 'david.thompson@preciouscare.com', phone: '(503) 555-0177' },
  { id: 3, name: 'Amanda Foster',    role: 'LPN',        email: 'amanda.foster@preciouscare.com',  phone: '(503) 555-0188' },
  { id: 4, name: 'Sarah Mitchell',   role: 'Caregiver',  email: 'sarah.mitchell@preciouscare.com', phone: '(503) 555-0123' },
  { id: 5, name: 'Carlos Mendez',    role: 'Caregiver',  email: 'carlos.mendez@preciouscare.com',  phone: '(503) 555-0156' },
  { id: 6, name: 'HR Department',    role: 'HR',         email: 'hr@preciouscare.com' },
  { id: 7, name: 'Billing Department', role: 'Billing',  email: 'billing@preciouscare.com' },
  { id: 8, name: 'Operations',       role: 'Ops',        email: 'ops@preciouscare.com' },
]
