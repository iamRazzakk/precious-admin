import { Button, message } from 'antd'
import { Download, FileText } from 'lucide-react'
import { payrollReportsSeed, type PayrollReport } from '@/data/payroll'

const FORMAT_STYLE: Record<PayrollReport['format'], { bg: string; color: string }> = {
  PDF:  { bg: '#FEE2E2', color: '#991B1B' },
  CSV:  { bg: '#D1FAE5', color: '#065F46' },
  XLSX: { bg: '#DBEAFE', color: '#1E40AF' },
}

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const PayrollReports = () => {
  const handleDownload = (r: PayrollReport) => {
    message.success(`Downloading "${r.title}"...`)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold" style={{ color: '#1b3a5c' }}>Reports</h2>
        <Button
          type="primary"
          icon={<FileText size={14} />}
          style={{ background: '#1b3a5c', borderColor: '#1b3a5c', height: 38, fontWeight: 600 }}
          onClick={() => message.success('New report queued.')}
        >
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {payrollReportsSeed.map((r) => {
          const { bg, color } = FORMAT_STYLE[r.format]
          return (
            <div
              key={r.id}
              className="bg-white rounded-[14px] border border-border-light p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-bold text-text-primary">{r.title}</div>
                  <div className="text-xs text-text-muted mt-1">{r.description}</div>
                </div>
                <span
                  className="inline-block px-2.5 py-[3px] rounded-pill text-[10px] font-bold tracking-wide flex-shrink-0"
                  style={{ background: bg, color }}
                >
                  {r.format}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-border-light pt-3">
                <div className="text-xs text-text-muted">
                  <div><span className="font-medium text-text-secondary">Period:</span> {r.period}</div>
                  <div className="mt-0.5"><span className="font-medium text-text-secondary">Generated:</span> {formatDate(r.generatedDate)}</div>
                </div>
                <Button
                  icon={<Download size={14} />}
                  onClick={() => handleDownload(r)}
                  style={{ height: 34, fontWeight: 600 }}
                >
                  Download
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PayrollReports
