import { useState } from 'react'
import { Drawer, Form, Input, Select, Button, Checkbox, Steps, message } from 'antd'
import { Plus } from 'lucide-react'
import type { HireStatus } from '@/types'

// ── Constants ─────────────────────────────────────────────────────────────────
const STEPS = ['Personal Info', 'Employment', 'Documents', 'Training', 'Review']

const ROLES = ['CNA', 'HHA', 'RN', 'LPN', 'Caregiver', 'Office Coordinator', 'Supervisor']
const STATUS_OPTIONS: HireStatus[] = ['Not Started', 'In Progress', 'Completed']

const DOCUMENT_OPTIONS = [
  'Personal Contact Information',
  'Background Check Authorization',
  "Valid Driver's License",
  'Auto Insurance Proof',
  'Emergency Contact Info',
  'I-9 Verification',
  'Direct Deposit',
  'Withholding Forms (W-4)',
  'Caregiver Job Description',
  '2026 Employee Handbook',
  'Company Signature Acknowledge',
  'Go Paperless!',
]

export interface TrainingItem {
  id: string
  title: string
  description: string
  duration: string
  required: boolean
}

export const TRAINING_ITEMS: TrainingItem[] = [
  { id: 'orientation',  title: 'Company Orientation',       description: 'Mission, values, and company policies',        duration: '2 hours',   required: true  },
  { id: 'hipaa',        title: 'HIPAA Compliance',          description: 'Patient privacy regulations and procedures',   duration: '3 hours',   required: true  },
  { id: 'infection',    title: 'Infection Control',         description: 'Proper sanitation and infection prevention',   duration: '2 hours',   required: true  },
  { id: 'safety',       title: 'Patient Safety',            description: 'Fall prevention, emergency protocols',         duration: '2 hours',   required: true  },
  { id: 'medication',   title: 'Medication Administration', description: 'Med pass procedures and documentation',        duration: '4 hours',   required: true  },
  { id: 'documentation',title: 'Documentation & Charting',  description: 'Proper care documentation practices',          duration: '2 hours',   required: true  },
  { id: 'abuse',        title: 'Abuse & Neglect Reporting', description: 'Oregon mandatory reporting requirements',      duration: '1.5 hours', required: true  },
  { id: 'cultural',     title: 'Cultural Sensitivity',      description: 'Providing culturally competent care',          duration: '1 hour',    required: false },
  { id: 'time',         title: 'Time & Attendance',         description: 'Clock in/out procedures, scheduling policies', duration: '1 hour',    required: false },
  { id: 'tech',         title: 'Technology Systems',        description: 'Using company apps and communication tools',   duration: '1 hour',    required: false },
]

// ── Form values ───────────────────────────────────────────────────────────────
export interface HireFormValues {
  fullName: string
  email: string
  phone: string

  role: string
  startDate: string
  notes: string

  documents: string[]

  trainings: string[]
  trainingNotes: Record<string, string>

  status: HireStatus
}

// ── Hire Drawer ───────────────────────────────────────────────────────────────
interface HireDrawerProps {
  open: boolean
  onSave: (v: HireFormValues) => void
  onClose: () => void
}

const HireDrawer = ({ open, onSave, onClose }: HireDrawerProps) => {
  const [form] = Form.useForm<HireFormValues>()
  const [step, setStep] = useState(1)
  const checkedTrainings: string[] = Form.useWatch('trainings', form) ?? []

  // Admin-extendable option lists
  const [documentOptions, setDocumentOptions] = useState<string[]>(DOCUMENT_OPTIONS)
  const [trainingItems, setTrainingItems] = useState<TrainingItem[]>(TRAINING_ITEMS)
  const [newDocument, setNewDocument] = useState('')
  const [newTrainingTitle, setNewTrainingTitle] = useState('')
  const [newTrainingDesc, setNewTrainingDesc] = useState('')

  const handleAddDocument = () => {
    const name = newDocument.trim()
    if (!name) return
    if (documentOptions.some((d) => d.toLowerCase() === name.toLowerCase())) {
      message.warning('This document already exists.')
      return
    }
    setDocumentOptions((prev) => [...prev, name])
    setNewDocument('')
  }

  const handleAddTraining = () => {
    const title = newTrainingTitle.trim()
    if (!title) return
    if (trainingItems.some((t) => t.title.toLowerCase() === title.toLowerCase())) {
      message.warning('This training already exists.')
      return
    }
    setTrainingItems((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        title,
        description: newTrainingDesc.trim() || 'Custom training',
        duration: '—',
        required: false,
      },
    ])
    setNewTrainingTitle('')
    setNewTrainingDesc('')
  }

  const reset = () => {
    form.resetFields()
    setStep(1)
  }

  const handleClose = () => { reset(); onClose() }

  const fieldsByStep: Record<number, (keyof HireFormValues)[]> = {
    1: ['fullName', 'email', 'phone'],
    2: ['role', 'startDate', 'notes'],
    3: ['documents'],
    4: ['trainings'],
    5: ['status'],
  }

  const validateStep = async (s: number) => {
    try {
      await form.validateFields(fieldsByStep[s])
      return true
    } catch {
      return false
    }
  }

  const handleNext = async () => {
    const ok = await validateStep(step)
    if (!ok) {
      message.error('Please fill all required fields before continuing.')
      return
    }
    setStep((s) => Math.min(s + 1, STEPS.length))
  }

  const handleStepChange = async (target: number) => {
    const targetStep = target + 1
    if (targetStep === step) return
    if (targetStep < step) {
      setStep(targetStep)
      return
    }
    for (let s = step; s < targetStep; s++) {
      const ok = await validateStep(s)
      if (!ok) {
        message.error(`Please complete step ${s} before continuing.`)
        setStep(s)
        return
      }
    }
    setStep(targetStep)
  }

  const handleBack = () => setStep((s) => Math.max(s - 1, 1))

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      onSave(values)
      reset()
    } catch {
      // validation errors shown inline
    }
  }

  return (
    <Drawer
      title={<span className="text-[17px] font-bold">Add New Hire</span>}
      open={open}
      onClose={handleClose}
      width={600}
      destroyOnHidden
      footer={
        <div className="flex justify-between gap-2 py-1">
          <Button onClick={handleClose} style={{ minWidth: 120 }}>Cancel</Button>
          <div className="flex gap-2">
            {step > 1 && <Button onClick={handleBack}>← Back</Button>}
            {step < STEPS.length && (
              <Button type="primary" onClick={handleNext} style={{ background: '#1b3a5c', borderColor: '#1b3a5c', minWidth: 120 }}>
                Next →
              </Button>
            )}
            {step === STEPS.length && (
              <Button type="primary" onClick={handleSave} style={{ background: '#1b3a5c', borderColor: '#1b3a5c', minWidth: 120 }}>
                Save Hire
              </Button>
            )}
          </div>
        </div>
      }
    >
      <Steps
        current={step - 1}
        onChange={handleStepChange}
        size="small"
        labelPlacement="vertical"
        items={STEPS.map((label) => ({ title: label }))}
        className="mb-7"
      />

      <Form
        form={form}
        layout="vertical"
        preserve
        initialValues={{
          documents: [],
          trainings: [],
          trainingNotes: {},
          status: 'Not Started',
        }}
      >
        {/* Step 1 — Personal Info */}
        <div className={step === 1 ? 'block' : 'hidden'}>
          <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Required' }]}>
            <Input placeholder="e.g. Jennifer Adams" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Required' }, { type: 'email', message: 'Invalid email' }]}>
            <Input placeholder="e.g. jennifer@email.com" />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Required' }]}>
            <Input placeholder="e.g. (503) 555-0101" />
          </Form.Item>
        </div>

        {/* Step 2 — Employment */}
        <div className={step === 2 ? 'block' : 'hidden'}>
          <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Required' }]}>
            <Select placeholder="Select role..." options={ROLES.map((r) => ({ label: r, value: r }))} />
          </Form.Item>
          <Form.Item label="Starting Date" name="startDate" rules={[{ required: true, message: 'Required' }]}>
            <Input type="date" className="w-full" />
          </Form.Item>
          <Form.Item label="Notes" name="notes" rules={[{ required: true, message: 'Required' }]}>
            <Input.TextArea rows={3} placeholder="Brief note about this hire..." />
          </Form.Item>
        </div>

        {/* Step 3 — Documents */}
        <div className={step === 3 ? 'block' : 'hidden'}>
          <Form.Item
            label="Submitted Documents"
            name="documents"
            rules={[{ required: true, type: 'array', min: 1, message: 'Select at least one document' }]}
          >
            <Checkbox.Group className="w-full">
              <div className="grid grid-cols-2 gap-2.5">
                {documentOptions.map((doc) => (
                  <div
                    key={doc}
                    className="border border-border-light rounded-[10px] px-3.5 py-2.5 bg-white"
                  >
                    <Checkbox value={doc} className="w-full">
                      <span className="text-[13px] font-medium text-text-primary">
                        {doc}
                      </span>
                    </Checkbox>
                  </div>
                ))}
              </div>
            </Checkbox.Group>
          </Form.Item>

          {/* Add a new document */}
          <div className="border border-dashed border-border-light rounded-[10px] px-3.5 py-3 bg-bg-subtle">
            <div className="text-xs font-semibold text-text-secondary mb-2">Add a new document</div>
            <div className="flex gap-2">
              <Input
                placeholder="e.g. Hepatitis B Waiver"
                value={newDocument}
                onChange={(e) => setNewDocument(e.target.value)}
                onPressEnter={(e) => { e.preventDefault(); handleAddDocument() }}
              />
              <Button
                onClick={handleAddDocument}
                icon={<Plus size={15} />}
                style={{ background: '#1b3a5c', borderColor: '#1b3a5c', color: '#fff' }}
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Step 4 — Training */}
        <div className={step === 4 ? 'block' : 'hidden'}>
          <Form.Item
            label="Completed Trainings"
            name="trainings"
            rules={[{
              validator: (_, value: string[] = []) => {
                const missing = trainingItems
                  .filter((t) => t.required && !value.includes(t.id))
                  .map((t) => t.title)
                if (missing.length) {
                  return Promise.reject(new Error(`Required: ${missing.join(', ')}`))
                }
                return Promise.resolve()
              },
            }]}
          >
            <Checkbox.Group className="w-full flex flex-col gap-3">
              {trainingItems.map((t) => (
                <div
                  key={t.id}
                  className="border border-border-light rounded-[10px] px-3.5 py-3 bg-white"
                >
                  <Checkbox value={t.id} style={{ alignItems: 'flex-start' }}>
                    <div className="ml-1">
                      <div className="text-sm font-semibold text-text-primary">
                        {t.title}
                        {t.required && <span className="text-[#DC2626] ml-1">*</span>}
                      </div>
                      <div className="text-xs text-text-muted mt-0.5">
                        {t.description} • {t.duration}
                      </div>
                    </div>
                  </Checkbox>

                  {checkedTrainings.includes(t.id) && (
                    <Form.Item
                      name={['trainingNotes', t.id]}
                      className="mt-3 mb-0"
                    >
                      <Input.TextArea
                        rows={2}
                        placeholder={`Notes about ${t.title}...`}
                      />
                    </Form.Item>
                  )}
                </div>
              ))}
            </Checkbox.Group>
          </Form.Item>

          {/* Add a new training */}
          <div className="border border-dashed border-border-light rounded-[10px] px-3.5 py-3 bg-bg-subtle">
            <div className="text-xs font-semibold text-text-secondary mb-2">Add a new training</div>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Training title — e.g. Dementia Care Basics"
                value={newTrainingTitle}
                onChange={(e) => setNewTrainingTitle(e.target.value)}
                onPressEnter={(e) => { e.preventDefault(); handleAddTraining() }}
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Short description (optional)"
                  value={newTrainingDesc}
                  onChange={(e) => setNewTrainingDesc(e.target.value)}
                  onPressEnter={(e) => { e.preventDefault(); handleAddTraining() }}
                />
                <Button
                  onClick={handleAddTraining}
                  icon={<Plus size={15} />}
                  style={{ background: '#1b3a5c', borderColor: '#1b3a5c', color: '#fff' }}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5 — Review */}
        <div className={step === 5 ? 'block' : 'hidden'}>
          <Form.Item label="Onboarding Status" name="status" rules={[{ required: true, message: 'Required' }]}>
            <Select placeholder="Select..." options={STATUS_OPTIONS.map((s) => ({ label: s, value: s }))} />
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  )
}

export default HireDrawer
