import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Role } from '@/types'

export const useSessionStore = defineStore('session', () => {
  const role = ref<Role>('client')

  function setRole(r: Role) {
    role.value = r
  }

  return { role, setRole }
})

