import { useEffect } from 'react'
import { Modal, Form, Input, Select, Button } from 'antd'
import { colors } from '@/utils/colors'
import type { StaffPosition } from '@/types'

const POSITIONS: StaffPosition[] = ['CNA', 'HHA', 'RN', 'LPN', 'Office Coordinator', 'Supervisor', 'PT', 'OT']

export interface StaffFormValues {
  name: string
  position: StaffPosition
  phone: string
  email: string
}

interface StaffFormModalProps {
  title: string
  open: boolean
  initial: StaffFormValues
  onSave: (v: StaffFormValues) => void
  onClose: () => void
}

const StaffFormModal = ({ title, open, initial, onSave, onClose }: StaffFormModalProps) => {
  const [form] = Form.useForm<StaffFormValues>()

  useEffect(() => {
    if (open) form.setFieldsValue(initial)
  }, [open, initial, form])

  const handleOk = async () => {
    const values = await form.validateFields()
    onSave(values)
    form.resetFields()
  }

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title={<span className="text-[17px] font-bold">{title}</span>}
      open={open}
      onCancel={handleCancel}
      width={520}
      destroyOnHidden
      footer={
        <div className="flex gap-2 justify-end">
          <Button
            type="primary"
            style={{ width: 120, background: colors.danger, boxShadow: 'none' }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleOk}
            style={{ width: 120, background: colors.primary, borderColor: colors.primary, boxShadow: 'none' }}
          >
            Save
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item label="Full Name" name="name" rules={[{ required: true, message: 'Required' }]}>
          <Input placeholder="e.g. Maria Santos" />
        </Form.Item>

        <Form.Item label="Position" name="position" rules={[{ required: true, message: 'Required' }]}>
          <Select options={POSITIONS.map((p) => ({ label: p, value: p }))} />
        </Form.Item>

        <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Required' }]}>
          <Input placeholder="(503) 555-0000" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Required' },
            { type: 'email', message: 'Invalid email' },
          ]}
        >
          <Input placeholder="name@example.com" type="email" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default StaffFormModal
