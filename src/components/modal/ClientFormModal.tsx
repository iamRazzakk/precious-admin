import { useEffect } from 'react'
import { Modal, Form, Input, Select, Button, Row, Col } from 'antd'
import { MapPin } from 'lucide-react'
import { colors } from '@/utils/colors'
import { staffSeed } from '@/data/staff'
import type { ServicePlan } from '@/types'

const ALL_PLANS: ServicePlan[] = [
  'Personal Care', 'Medication Management', 'Nursing Services', 'Companion Care',
  'Homemaker Services', 'Specialized Care', 'Respite Care', 'Dementia Care',
]

const staffOptions = staffSeed
  .filter((s) => s.status !== 'Banned')
  .map((s) => ({ label: `${s.name} — ${s.position}`, value: s.name }))

export interface ClientFormValues {
  name: string
  street: string
  city: string
  state: string
  zip: string
  lat?: string
  lng?: string
  servicePlans: ServicePlan[]
  caregiver?: string
}

interface ClientFormModalProps {
  title: string
  open: boolean
  initial: ClientFormValues
  onSave: (v: ClientFormValues) => void
  onClose: () => void
}

const ClientFormModal = ({ title, open, initial, onSave, onClose }: ClientFormModalProps) => {
  const [form] = Form.useForm<ClientFormValues>()

  useEffect(() => {
    if (open) form.setFieldsValue(initial)
  }, [open, initial, form])

  const handleUseLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((pos) => {
      form.setFieldsValue({
        lat: pos.coords.latitude.toFixed(4),
        lng: pos.coords.longitude.toFixed(4),
      })
    })
  }

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
      width={700}
      destroyOnHidden
      footer={
        <div className="flex items-center justify-between">
          <Button icon={<MapPin size={14} />} onClick={handleUseLocation} className="flex items-center gap-1.5">
            Use My Current Location
          </Button>
          <div className="flex gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              type="primary"
              onClick={handleOk}
              style={{ background: colors.primary, borderColor: colors.primary }}
            >
              Save Client
            </Button>
          </div>
        </div>
      }
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Full Name" name="name" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="e.g. Margaret Thompson" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Street Address" name="street" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="e.g. 2345 SW Murray Blvd" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="City" name="city" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="e.g. Beaverton" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="State" name="state" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="OR" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="ZIP" name="zip" rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="97005" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Service Plans" name="servicePlans">
              <Select
                mode="multiple"
                placeholder="Select plans..."
                options={ALL_PLANS.map((p) => ({ label: p, value: p }))}
                allowClear
                maxTagCount={2}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Latitude" name="lat">
              <Input placeholder="45.4871" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Longitude" name="lng">
              <Input placeholder="-122.8037" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Caregiver (Staff)" name="caregiver">
              <Select
                placeholder="Select staff member..."
                options={staffOptions}
                allowClear
                showSearch
                filterOption={(input, opt) =>
                  (opt?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ClientFormModal
