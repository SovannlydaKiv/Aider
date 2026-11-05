<!-- src/components/FilterBar.vue -->
<script setup lang="ts">
import type { Availability, Experience } from '@/types'

const props = defineProps<{
  search: string
  availability: Availability | ''
  experience: Experience | ''
}>()

const emit = defineEmits<{
  'update:search': [value: string]
  'update:availability': [value: Availability | '']
  'update:experience': [value: Experience | '']
}>()

const availabilityOptions: { label: string; value: Availability | '' }[] = [
  { label: 'Any', value: '' },
  { label: 'Full-time', value: 'full_time' },
  { label: 'Part-time', value: 'part_time' },
  { label: 'Whenever needed', value: 'whenever_needed' },
]

const experienceOptions: { label: string; value: Experience | '' }[] = [
  { label: 'Any', value: '' },
  { label: 'Beginner', value: 'none' },
  { label: 'Experienced', value: 'some' },
  { label: 'Expert', value: 'degree' },
]
</script>

<template>
  <div class="filter-bar">
    <div class="filter-bar__search-row">
      <input
        class="filter-bar__search"
        type="text"
        placeholder="Search by name or area, e.g. Sen Sok or Toul Kork"
        :value="props.search"
        @input="emit('update:search', ($event.target as HTMLInputElement).value)"
      />
      <button class="btn btn--primary filter-bar__search-btn">Search</button>
    </div>

    <div class="filter-bar__group">
      <span class="filter-bar__label">Experience</span>
      <div class="filter-bar__chips">
        <button
          v-for="opt in experienceOptions"
          :key="opt.value"
          class="chip"
          :class="{ 'chip--active': props.experience === opt.value }"
          @click="emit('update:experience', opt.value)"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <div class="filter-bar__group">
      <span class="filter-bar__label">Availability</span>
      <div class="filter-bar__chips">
        <button
          v-for="opt in availabilityOptions"
          :key="opt.value"
          class="chip"
          :class="{ 'chip--active': props.availability === opt.value }"
          @click="emit('update:availability', opt.value)"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.filter-bar__search-row {
  display: flex;
  gap: 0.75rem;
}

.filter-bar__search {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.filter-bar__search:focus {
  border-color: var(--color-pink);
}

.filter-bar__search-btn {
  white-space: nowrap;
  padding: 0.75rem 1.5rem;
}

.filter-bar__group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-bar__label {
  font-weight: 600;
  min-width: 90px;
  color: var(--color-teal);
}

.filter-bar__chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>

