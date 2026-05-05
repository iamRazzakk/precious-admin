import { useEffect } from 'react'
import { Drawer, Form, DatePicker, TimePicker, Select, Input, Button } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { clientsSeed } from '@/data/clients'
import { staffSeed } from '@/data/staff'
import type { Shift } from '@/types'

const SHIFT_TYPES = [
  { label: 'Morning',   value: 'Morning' },
  { label: 'Afternoon', value: 'Afternoon' },
  { label: 'Evening',   value: 'Evening' },
  { label: 'Night',     value: 'Night' },
]

export type ShiftDrawerState =
  | { type: 'none' }
  | { type: 'add' }
  | { type: 'edit'; shift: Shift }

export interface ShiftFormValues {
  date: Dayjs
  startTime: Dayjs
  endTime: Dayjs
  client: string
  caregiver: string
  type: string
  notes?: string
}

interface ShiftDrawerProps {
  state: ShiftDrawerState
  shiftNameFor: (id: number) => string
  onSave: (values: ShiftFormValues) => void
  onClose: () => void
}

const clientOptions = [
  { label: 'Martha Johnson', value: 'Martha Johnson' },
  ...clientsSeed.map((c) => ({ label: c.name, value: c.name })),
]

const caregiverOptions = [
  { label: 'Sarah Mitchell', value: 'Sarah Mitchell' },
  ...staffSeed.map((s) => ({ label: s.name, value: s.name })),
]

const ShiftDrawer = ({ state, shiftNameFor, onSave, onClose }: ShiftDrawerProps) => {
  const [form] = Form.useForm<ShiftFormValues>()

  useEffect(() => {
    if (state.type === 'add') {
      form.setFieldsValue({
        date: dayjs(),
        startTime: dayjs('08:00 AM', 'hh:mm A'),
        endTime: dayjs('04:00 PM', 'hh:mm A'),
        client: 'Martha Johnson',
        caregiver: 'Sarah Mitchell',
        type: 'Morning',
        notes: undefined,
      })
    } else if (state.type === 'edit') {
      const s = state.shift
      form.setFieldsValue({
        date: dayjs(s.date),
        startTime: dayjs(s.clockIn, 'hh:mm A'),
        endTime: dayjs(s.clockOut, 'hh:mm A'),
        client: s.clientName,
        caregiver: s.staffName,
        type: shiftNameFor(s.id),
        notes: undefined,
      })
    }
  }, [state, form, shiftNameFor])

  const handleClose = () => {
    onClose()
    form.resetFields()
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      onSave(values)
      form.resetFields()
    } catch {
      // validation errors are shown inline
    }
  }

  const drawerTitle = state.type === 'edit' ? 'Edit Shift' : 'New Shift'

  return (
    <Drawer
      title={<span style={{ color: '#1b3a5c', fontWeight: 700, fontSize: 18 }}>{drawerTitle}</span>}
      open={state.type !== 'none'}
      onClose={handleClose}
      destroyOnClose
      width={460}
      placement="right"
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        className="mt-2"
      >
        <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Date is required' }]}>
          <DatePicker style={{ width: '100%' }} format="MM/DD/YYYY" />
        </Form.Item>

        <Form.Item name="startTime" label="Start Time" rules={[{ required: true, message: 'Start time is required' }]}>
          <TimePicker style={{ width: '100%' }} format="hh:mm A" use12Hours minuteStep={15} />
        </Form.Item>

        <Form.Item name="endTime" label="End Time" rules={[{ required: true, message: 'End time is required' }]}>
          <TimePicker style={{ width: '100%' }} format="hh:mm A" use12Hours minuteStep={15} />
        </Form.Item>

        <Form.Item name="client" label="Client" rules={[{ required: true, message: 'Client is required' }]}>
          <Select options={clientOptions} />
        </Form.Item>

        <Form.Item name="caregiver" label="Caregiver" rules={[{ required: true, message: 'Caregiver is required' }]}>
          <Select options={caregiverOptions} />
        </Form.Item>

        <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Type is required' }]}>
          <Select options={SHIFT_TYPES} />
        </Form.Item>

        <Form.Item name="notes" label="Notes">
          <Input.TextArea rows={3} />
        </Form.Item>

        <div className="flex gap-3 mt-2">
          <Button
            type="primary"
            onClick={handleSave}
            style={{ background: '#1b3a5c', borderColor: '#1b3a5c', height: 42, fontWeight: 600, flex: 1 }}
          >
            {state.type === 'edit' ? 'Update Shift' : 'Save Shift'}
          </Button>
          <Button
            onClick={handleClose}
            style={{ height: 42, fontWeight: 600, flex: 1 }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Drawer>
  )
}

export default ShiftDrawer
