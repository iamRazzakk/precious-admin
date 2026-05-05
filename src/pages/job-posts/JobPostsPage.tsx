import { useState } from 'react'
import { Popconfirm, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Card, PrimaryButton } from '@/components/common'
import { JobPostDrawer } from '@/components/drawer'
import type { JobPostFormValues } from '@/components/drawer'
import { jobPostsSeed } from '@/data/jobPosts'
import type { JobPost, JobPostStatus } from '@/types'

const STATUS_STYLE: Record<JobPostStatus, { bg: string; color: string }> = {
  Open:   { bg: '#D1FAE5', color: '#065F46' },
  Closed: { bg: '#FEE2E2', color: '#991B1B' },
  Draft:  { bg: '#FEF3C7', color: '#92400E' },
}

const StatusBadge = ({ status }: { status: JobPostStatus }) => {
  const { bg, color } = STATUS_STYLE[status]
  return (
    <span
      className="inline-block px-3 py-[3px] rounded-pill text-xs font-semibold whitespace-nowrap"
      style={{ background: bg, color }}
    >
      {status}
    </span>
  )
}

let nextId = 7
const PAGE_SIZE = 5

type DrawerState = { type: 'none' } | { type: 'add' } | { type: 'edit'; post: JobPost }

const emptyInitial: JobPostFormValues = {
  title: '',
  position: 'CNA',
  location: '',
  employmentType: 'Full-time',
  payMin: '',
  payMax: '',
  description: '',
  requirements: '',
  status: 'Open',
}

const editInitial = (post: JobPost): JobPostFormValues => ({
  title: post.title,
  position: post.position,
  location: post.location,
  employmentType: post.employmentType,
  payMin: post.payMin,
  payMax: post.payMax,
  description: post.description,
  requirements: post.requirements,
  status: post.status,
})

const JobPostsPage = () => {
  const [posts, setPosts] = useState<JobPost[]>(jobPostsSeed)
  const [drawer, setDrawer] = useState<DrawerState>({ type: 'none' })
  const [page, setPage] = useState(1)

  const closeDrawer = () => setDrawer({ type: 'none' })

  const handleAdd = (v: JobPostFormValues) => {
    setPosts((p) => [
      ...p,
      {
        id: nextId++,
        title: v.title.trim(),
        position: v.position,
        location: v.location.trim(),
        employmentType: v.employmentType,
        payMin: v.payMin.trim(),
        payMax: v.payMax.trim(),
        description: v.description.trim(),
        requirements: v.requirements.trim(),
        postedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: v.status,
      },
    ])
    closeDrawer()
  }

  const handleEdit = (v: JobPostFormValues) => {
    if (drawer.type !== 'edit') return
    setPosts((p) =>
      p.map((post) =>
        post.id === drawer.post.id
          ? {
              ...post,
              title: v.title.trim(),
              position: v.position,
              location: v.location.trim(),
              employmentType: v.employmentType,
              payMin: v.payMin.trim(),
              payMax: v.payMax.trim(),
              description: v.description.trim(),
              requirements: v.requirements.trim(),
              status: v.status,
            }
          : post,
      ),
    )
    closeDrawer()
  }

  const deletePost = (id: number) =>
    setPosts((p) => p.filter((post) => post.id !== id))

  const columns: ColumnsType<JobPost> = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string) => (
        <span className="text-sm font-bold text-text-primary whitespace-nowrap">{title}</span>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (position: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{position}</span>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{location}</span>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'employmentType',
      key: 'employmentType',
      render: (employmentType: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{employmentType}</span>
      ),
    },
    {
      title: 'Pay Range',
      key: 'payRange',
      render: (_, post) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">
          ${post.payMin} – ${post.payMax}/hr
        </span>
      ),
    },
    {
      title: 'Posted',
      dataIndex: 'postedDate',
      key: 'postedDate',
      render: (postedDate: string) => (
        <span className="text-sm text-text-secondary whitespace-nowrap">{postedDate}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: JobPostStatus) => <StatusBadge status={status} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, post) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawer({ type: 'edit', post })}
            title="Edit"
            className="w-8 h-8 rounded-lg border-0 bg-primary-light text-primary cursor-pointer flex items-center justify-center"
          >
            <Pencil size={14} />
          </button>
          <Popconfirm
            title="Delete Job Post"
            description={`Are you sure you want to delete "${post.title}"?`}
            onConfirm={() => deletePost(post.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <button
              title="Delete"
              className="w-8 h-8 rounded-lg border-0 bg-danger-light text-danger cursor-pointer flex items-center justify-center"
            >
              <Trash2 size={14} />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="px-8 py-7">
      <Card padding={0}>
        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
          <span className="text-base font-bold text-text-primary">Job Post Management</span>
          <PrimaryButton Icon={Plus} label="Add Job Post" onClick={() => setDrawer({ type: 'add' })} />
        </div>

        <Table<JobPost>
          columns={columns}
          dataSource={posts}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: 'No job posts found.' }}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total: posts.length,
            onChange: (p) => setPage(p),
            showSizeChanger: false,
            hideOnSinglePage: true,
            position: ['bottomRight'],
          }}
        />
      </Card>

      <JobPostDrawer
        title="Add New Job Post"
        open={drawer.type === 'add'}
        initial={emptyInitial}
        onSave={handleAdd}
        onClose={closeDrawer}
      />

      <JobPostDrawer
        title="Edit Job Post"
        open={drawer.type === 'edit'}
        initial={drawer.type === 'edit' ? editInitial(drawer.post) : emptyInitial}
        onSave={handleEdit}
        onClose={closeDrawer}
      />
    </div>
  )
}

export default JobPostsPage
