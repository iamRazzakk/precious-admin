import type { Payment } from '@/types'

export const paymentsSeed: Payment[] = [
  { id: 1,  date: 'Apr 23, 2026', clientName: 'Eleanor Mitchell',  invoice: 'INV-2026-042', amount: 620, method: 'Card',          status: 'Confirmed' },
  { id: 2,  date: 'Apr 22, 2026', clientName: 'George Patterson',  invoice: 'INV-2026-040', amount: 840, method: 'Zelle',         status: 'Confirmed' },
  { id: 3,  date: 'Apr 21, 2026', clientName: 'Helen Zhao',        invoice: 'INV-2026-039', amount: 450, method: 'Bank Transfer', status: 'Pending' },
  { id: 4,  date: 'Apr 20, 2026', clientName: 'William Foster',    invoice: 'INV-2026-038', amount: 720, method: 'CashApp',       status: 'Confirmed' },
  { id: 5,  date: 'Apr 18, 2026', clientName: 'Rose Nakamura',     invoice: 'INV-2026-037', amount: 560, method: 'Apple Pay',     status: 'Confirmed' },
  { id: 6,  date: 'Apr 15, 2026', clientName: 'Arthur Gonzalez',   invoice: 'INV-2026-036', amount: 680, method: 'Card',          status: 'Confirmed' },
  { id: 7,  date: 'Apr 12, 2026', clientName: 'Eleanor Mitchell',  invoice: 'INV-2026-035', amount: 580, method: 'Bank Transfer', status: 'Confirmed' },
  { id: 8,  date: 'Apr 10, 2026', clientName: 'George Patterson',  invoice: 'INV-2026-034', amount: 840, method: 'Zelle',         status: 'Confirmed' },
  { id: 9,  date: 'Apr 8, 2026',  clientName: 'Helen Zhao',        invoice: 'INV-2026-033', amount: 450, method: 'CashApp',       status: 'Failed' },
  { id: 10, date: 'Apr 6, 2026',  clientName: 'Rose Nakamura',     invoice: 'INV-2026-032', amount: 560, method: 'Apple Pay',     status: 'Refunded' },
  { id: 11, date: 'Apr 4, 2026',  clientName: 'William Foster',    invoice: 'INV-2026-031', amount: 720, method: 'Check',         status: 'Confirmed' },
  { id: 12, date: 'Apr 2, 2026',  clientName: 'Arthur Gonzalez',   invoice: 'INV-2026-030', amount: 680, method: 'Card',          status: 'Pending' },
]
