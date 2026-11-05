import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useJobsStore } from '../stores/jobs'
import type { JobPosting } from '../types'

const mockJobs: JobPosting[] = [
  {
    id: 1,
    clientId: 1,
    title: 'Morning help for my mother',
    description: 'Meals and medicine reminders.',
    timeType: 'part_time',
    urgency: 'urgent',
    district: 'Toul Kork',
    status: 'open',
    createdAt: '2026-10-20',
  },
  {
    id: 2,
    clientId: 2,
    title: 'Newborn care at night',
    description: 'Three nights a week.',
    timeType: 'part_time',
    urgency: 'normal',
    district: 'Daun Penh',
    status: 'open',
    createdAt: '2026-10-22',
  },
]

describe('useJobsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with empty jobs and idle status', () => {
    const store = useJobsStore()
    expect(store.jobs).toEqual([])
    expect(store.status).toBe('idle')
    expect(store.error).toBeNull()
  })

  it('fetchAll: populates jobs on successful fetch', async () => {
    global.fetch = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => mockJobs,
    } as Response)

    const store = useJobsStore()
    await store.fetchAll()

    expect(store.status).toBe('success')
    expect(store.jobs).toHaveLength(2)
    expect(store.jobs[0]!.title).toBe('Morning help for my mother')
  })

  it('fetchAll: sets status to error when fetch fails', async () => {
    global.fetch = vi.fn<typeof fetch>().mockResolvedValue({ ok: false } as Response)

    const store = useJobsStore()
    await store.fetchAll()

    expect(store.status).toBe('error')
    expect(store.error).toBe('Failed to fetch jobs')
  })

  it('create: posts a new job and appends it to the list', async () => {
    const newJobPayload = {
      clientId: 1,
      title: 'Help with groceries',
      description: '',
      timeType: 'part_time' as const,
      urgency: 'low' as const,
      district: 'Sen Sok',
      status: 'open' as const,
      createdAt: '2026-11-05',
    }
    const created: JobPosting = { id: 3, ...newJobPayload }

    global.fetch = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => created,
    } as Response)

    const store = useJobsStore()
    const result = await store.create(newJobPayload)

    expect(result.id).toBe(3)
    expect(result.title).toBe('Help with groceries')
    expect(store.jobs).toHaveLength(1)
    expect(store.jobs[0]).toEqual(created)
  })

  it('create: throws when the API returns an error', async () => {
    global.fetch = vi.fn<typeof fetch>().mockResolvedValue({ ok: false } as Response)

    const store = useJobsStore()
    await expect(store.create({
      clientId: 1,
      title: 'Test',
      description: '',
      timeType: 'part_time',
      urgency: 'low',
      district: 'Sen Sok',
      status: 'open',
      createdAt: '2026-11-05',
    })).rejects.toThrow('Failed to create job')
  })
})
