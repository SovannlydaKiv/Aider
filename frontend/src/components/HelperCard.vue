<!-- src/components/HelperCard.vue -->
<script setup lang="ts">
import type { HelperProfile } from '@/types'

const props = defineProps<{ helper: HelperProfile }>()
const emit = defineEmits<{ select: [id: number] }>()

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const experienceLabel: Record<string, string> = {
  none: 'Beginner',
  some: 'Experienced',
  degree: 'Expert',
}

const availLabel: Record<string, string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  whenever_needed: 'Whenever needed',
}
</script>

<template>
  <article class="helper-card">
    <div class="helper-card__header">
      <div class="avatar">{{ initials(props.helper.name) }}</div>
      <div>
        <h2 class="helper-card__name">{{ props.helper.name }}</h2>
        <p class="helper-card__meta">
          {{ experienceLabel[props.helper.experience] }} ·
          {{ availLabel[props.helper.availability] }} ·
          {{ props.helper.district }}
        </p>
        <p v-if="props.helper.degrees.length" class="helper-card__degree">
          {{ props.helper.degrees.join(', ') }}
          <span class="badge badge--verified">Verified ✓</span>
        </p>
        <p v-else class="helper-card__degree">
          No degree listed
        </p>
      </div>
    </div>
    <button class="btn btn--outline helper-card__btn" @click="emit('select', props.helper.id)">
      View profile
    </button>
  </article>
</template>

<style scoped>
.helper-card {
  border: 1.5px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #fff;
  transition: box-shadow 0.15s;
}

.helper-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.helper-card__header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.helper-card__name {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-teal);
  margin: 0 0 0.2rem;
}

.helper-card__meta {
  color: var(--color-text-muted);
  margin: 0 0 0.25rem;
  font-size: 0.9rem;
}

.helper-card__degree {
  margin: 0;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.helper-card__btn {
  align-self: stretch;
}
</style>

