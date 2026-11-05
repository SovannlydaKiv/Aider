<!-- src/pages/HelperListPage.vue -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FilterBar from '@/components/FilterBar.vue'
import HelperCard from '@/components/HelperCard.vue'
import { useHelpersStore } from '@/stores/helpers'
import type { Availability, Experience } from '@/types'

const router = useRouter()
const store = useHelpersStore()

const search = ref('')
const availability = ref<Availability | ''>('')
const experience = ref<Experience | ''>('')

onMounted(() => store.fetchAll())

const filtered = computed(() => {
  return store.helpers.filter((h) => {
    const matchSearch =
      !search.value ||
      h.name.toLowerCase().includes(search.value.toLowerCase()) ||
      h.district.toLowerCase().includes(search.value.toLowerCase())
    const matchAvail = !availability.value || h.availability === availability.value
    const matchExp = !experience.value || h.experience === experience.value
    return matchSearch && matchAvail && matchExp
  })
})

function onSelect(id: number) {
  router.push(`/helpers/${id}`)
}
</script>

<template>
  <main class="helper-list">
    <h1 class="page-title">Find helpers</h1>
    <p class="page-sub">Choose a helper who is right for you.</p>

    <FilterBar
      v-model:search="search"
      v-model:availability="availability"
      v-model:experience="experience"
    />

    <div v-if="store.status === 'loading'" class="loading-state">
      <div class="spinner"></div>
      <p class="loading-text">Loading helpers from Phnom Penh…</p>
    </div>
    <div v-else-if="store.status === 'error'" class="state-msg state-msg--error">
      {{ store.error }}
    </div>
    <div v-else-if="filtered.length === 0" class="state-msg">No helpers match your filters.</div>
    <div v-else class="helper-list__grid">
      <HelperCard
        v-for="helper in filtered"
        :key="helper.id"
        :helper="helper"
        @select="onSelect"
      />
    </div>

    <!-- Responsive pagination footer matching wireframe -->
    <footer class="helper-list__pagination" v-if="filtered.length > 0">
      <span class="pagination-info">
        Showing 1–{{ filtered.length }} of {{ store.helpers.length }} helpers
      </span>
      <div class="pagination-controls">
        <button class="page-btn page-btn--active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <button class="page-btn page-btn--next">Next page →</button>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.helper-list {
  flex: 1;
  width: 100%;
  padding: 2.5rem clamp(1.5rem, 3.5vw, 4rem);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.helper-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.5rem;
  width: 100%;
  margin-bottom: 2.5rem;
}

/* Loading state */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4.5rem 2rem;
  gap: 1rem;
}

.spinner {
  width: 44px;
  height: 44px;
  border: 4px solid var(--color-pink-light);
  border-top-color: var(--color-pink);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: var(--color-teal);
  font-weight: 600;
  font-size: 1.05rem;
  margin: 0;
}

/* Pagination */
.helper-list__pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.5rem;
}

.pagination-info {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.pagination-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.page-btn {
  min-width: 38px;
  height: 38px;
  padding: 0 0.75rem;
  border-radius: 8px;
  border: 1.5px solid var(--color-border);
  background: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--color-text);
  transition: all 0.15s ease;
}

.page-btn:hover {
  border-color: var(--color-pink);
  color: var(--color-pink-hover);
}

.page-btn--active {
  background: var(--color-pink-light);
  border-color: var(--color-pink);
  color: var(--color-pink);
}

.page-btn--next {
  color: var(--color-teal);
  border-color: var(--color-teal);
  font-weight: 700;
}

.page-btn--next:hover {
  background: var(--color-teal-light);
  border-color: var(--color-teal);
  color: var(--color-teal);
}
</style>
