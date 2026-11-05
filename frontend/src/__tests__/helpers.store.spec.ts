import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useHelpersStore } from '../stores/helpers'
import type { HelperProfile } from '../types'

const mockHelpers: HelperProfile[] = [
  {
    id: 1,
    userId: 11,
    name: 'Chiv Inthera',
    experience: 'degree',
    degrees: ['Nursing diploma'],
    availability: 'full_time',
    district: 'Chamkar Mon',
    bio: 'Elderly care nurse, 6 years.',
  },
  {
    id: 2,
    userId: 12,
    name: 'Chan Chenda',
    experience: 'some',
    degrees: [],
    availability: 'part_time',
    district: 'Toul Kork',
    bio: 'Helped with newborn care for two families.',
  },
]

describe('useHelpersStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with empty helpers and idle status', () => {
    const store = useHelpersStore()
    expect(store.helpers).toEqual([])
    expect(store.status).toBe('idle')
    expect(store.error).toBeNull()
  })

  it('fetchAll: sets helpers and status to success on OK response', async () => {
    global.fetch = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => mockHelpers,
    } as Response)

    const store = useHelpersStore()
    await store.fetchAll()

    expect(store.status).toBe('success')
    expect(store.helpers).toHaveLength(2)
    expect(store.helpers[0]!.name).toBe('Chiv Inthera')
  })

  it('fetchAll: sets error and status to error on failed response', async () => {
    global.fetch = vi.fn<typeof fetch>().mockResolvedValue({
      ok: false,
    } as Response)

    const store = useHelpersStore()
    await store.fetchAll()

    expect(store.status).toBe('error')
    expect(store.error).toBe('Failed to fetch helpers')
  })

  it('byId: returns the correct helper by id', async () => {
    global.fetch = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => mockHelpers,
    } as Response)

    const store = useHelpersStore()
    await store.fetchAll()

    expect(store.byId(1)?.name).toBe('Chiv Inthera')
    expect(store.byId(2)?.name).toBe('Chan Chenda')
    expect(store.byId(99)).toBeNull()
  })

  it('byId: returns null when helpers list is empty', () => {
    const store = useHelpersStore()
    expect(store.byId(1)).toBeNull()
  })
})
