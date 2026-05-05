import { Form, Input, Button, Select, message } from 'antd'
import { Send } from 'lucide-react'
import { emailContactsSeed } from '@/data/emails'

type ComposeForm = {
  to: string[]
  subject: string
  body: string
}

const EmailCompose = () => {
  const [form] = Form.useForm<ComposeForm>()

  const handleSend = async () => {
    try {
      const v = await form.validateFields()
      console.log('Send email:', v)
      message.success('Email sent')
      form.resetFields()
    } catch {
      // validation handled inline
    }
  }

  const handleDraft = async () => {
    const v = form.getFieldsValue()
    console.log('Save draft:', v)
    message.success('Draft saved')
  }

  const recipientOptions = emailContactsSeed.map((c) => ({
    label: `${c.name} — ${c.email}`,
    value: c.email,
  }))

  return (
    <div>
      <h2 className="text-base font-bold mb-4" style={{ color: '#1b3a5c' }}>Compose</h2>
      <div className="bg-white rounded-[14px] border border-border-light p-6">
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item name="to" label="To" rules={[{ required: true, message: 'Recipient is required' }]}>
            <Select
              mode="tags"
              placeholder="Select or type recipient email..."
              options={recipientOptions}
              tokenSeparators={[',']}
            />
          </Form.Item>

          <Form.Item name="subject" label="Subject" rules={[{ required: true, message: 'Subject is required' }]}>
            <Input placeholder="Subject" />
          </Form.Item>

          <Form.Item name="body" label="Message" rules={[{ required: true, message: 'Message is required' }]}>
            <Input.TextArea rows={10} placeholder="Write your message..." />
          </Form.Item>

          <div className="flex gap-3 mt-1">
            <Button
              type="primary"
              icon={<Send size={14} />}
              onClick={handleSend}
              style={{ background: '#1b3a5c', borderColor: '#1b3a5c', height: 42, fontWeight: 600 }}
            >
              Send
            </Button>
            <Button onClick={handleDraft} style={{ height: 42, fontWeight: 600 }}>
              Save Draft
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default EmailCompose
