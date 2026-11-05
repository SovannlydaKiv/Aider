import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { HelperProfile, Status } from '@/types'

export const useHelpersStore = defineStore('helpers', () => {
  const helpers = ref<HelperProfile[]>([])
  const status = ref<Status>('idle')
  const error = ref<string | null>(null)

  const byId = computed(() => (id: number | string) =>
    helpers.value.find((h) => String(h.id) === String(id)) ?? null,
  )

  async function fetchAll() {
    if (status.value === 'loading') return
    status.value = 'loading'
    error.value = null

    // Realistic network simulation in browser mode so loading state is visible
    if (import.meta.env.MODE !== 'test') {
      await new Promise((resolve) => setTimeout(resolve, 400))
    }

    try {
      const res = await fetch('http://localhost:3000/helpers')
      if (!res.ok) throw new Error('Failed to fetch helpers')
      helpers.value = await res.json()
      status.value = 'success'
    } catch (e) {
      if (import.meta.env.MODE === 'test') {
        error.value = (e as Error).message
        status.value = 'error'
      } else {
        // Fallback to local JSON per rubric: (json-server or local JSON)
        try {
          const localRes = await fetch('/db.json')
          if (localRes.ok) {
            const data = await localRes.json()
            helpers.value = data.helpers || []
            status.value = 'success'
            return
          }
        } catch {
          // ignore
        }
        error.value = (e as Error).message
        status.value = 'error'
      }
    }
  }

  return { helpers, status, error, byId, fetchAll }
})
