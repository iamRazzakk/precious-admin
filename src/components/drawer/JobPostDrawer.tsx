import { useEffect } from 'react'
import { Drawer, Form, Input, Select, Button, Row, Col } from 'antd'
import type { JobPostStatus, EmploymentType, StaffPosition } from '@/types'

const STATUS_OPTIONS: { label: string; value: JobPostStatus }[] = [
  { label: 'Open', value: 'Open' },
  { label: 'Closed', value: 'Closed' },
  { label: 'Draft', value: 'Draft' },
]

const EMPLOYMENT_TYPES: EmploymentType[] = [
  'Full-time', 'Part-time', 'PRN / Per-diem', 'Contract',
]

const POSITIONS: StaffPosition[] = [
  'CNA', 'HHA', 'RN', 'LPN', 'Office Coordinator', 'Supervisor', 'PT', 'OT',
]

export interface JobPostFormValues {
  title: string
  position: StaffPosition
  location: string
  employmentType: EmploymentType
  payMin: string
  payMax: string
  description: string
  requirements: string
  status: JobPostStatus
}

interface JobPostDrawerProps {
  title: string
  open: boolean
  initial: JobPostFormValues
  onSave: (v: JobPostFormValues) => void
  onClose: () => void
}

const JobPostDrawer = ({ title, open, initial, onSave, onClose }: JobPostDrawerProps) => {
  const [form] = Form.useForm<JobPostFormValues>()

  useEffect(() => {
    if (open) form.setFieldsValue(initial)
  }, [open, initial, form])

  const handleSave = async () => {
    const values = await form.validateFields()
    onSave(values)
    form.resetFields()
  }

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Drawer
      title={<span className="text-[17px] font-bold">{title}</span>}
      open={open}
      onClose={handleClose}
      width={560}
      destroyOnHidden
      footer={
        <div className="flex justify-end gap-2 py-1">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={handleSave} style={{ background: '#1b3a5c', borderColor: '#1b3a5c' }}>
            Save Job Post
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Job Title" name="title" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="e.g. Certified Nursing Assistant" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Position" name="position" rules={[{ required: true, message: 'Required' }]}>
              <Select
                placeholder="Select position..."
                options={POSITIONS.map((p) => ({ label: p, value: p }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="e.g. Portland, OR" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Employment Type" name="employmentType" rules={[{ required: true, message: 'Required' }]}>
              <Select
                placeholder="Select type..."
                options={EMPLOYMENT_TYPES.map((t) => ({ label: t, value: t }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Pay Min ($/hr)" name="payMin" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="e.g. 18.00" prefix="$" suffix="/hr" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Pay Max ($/hr)" name="payMax" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="e.g. 24.00" prefix="$" suffix="/hr" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Required' }]}>
              <Select
                placeholder="Select status..."
                options={STATUS_OPTIONS}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Job Description" name="description" rules={[{ required: true, message: 'Required' }]}>
          <Input.TextArea rows={4} placeholder="Describe the role, responsibilities, and work environment..." />
        </Form.Item>

        <Form.Item label="Requirements" name="requirements" rules={[{ required: true, message: 'Required' }]}>
          <Input.TextArea rows={4} placeholder="List certifications, experience, and qualifications required..." />
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default JobPostDrawer
