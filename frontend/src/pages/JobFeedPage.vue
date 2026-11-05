<!-- src/pages/JobFeedPage.vue -->
<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import type { Urgency } from '@/types'

const router = useRouter()
const store = useJobsStore()

onMounted(() => store.fetchAll())

const urgencyLabel: Record<Urgency, string> = {
  low: 'Any time',
  normal: 'This week',
  urgent: 'Today',
}

const urgencyClass: Record<Urgency, string> = {
  low: 'badge--low',
  normal: 'badge--normal',
  urgent: 'badge--urgent',
}

const totalOpen = computed(() => store.jobs.filter((j) => j.status === 'open').length)
</script>

<template>
  <main class="job-feed">
    <div class="job-feed__topbar">
      <div>
        <h1 class="page-title">My jobs</h1>
        <p class="page-sub">
          You have {{ totalOpen }} open job{{ totalOpen !== 1 ? 's' : '' }}. Choose a job to see
          who can help.
        </p>
      </div>
      <button class="btn btn--primary" @click="router.push('/jobs/new')">+ Post a job</button>
    </div>

    <div v-if="store.status === 'loading'" class="loading-state">
      <div class="spinner"></div>
      <p class="loading-text">Loading jobs…</p>
    </div>
    <div v-else-if="store.status === 'error'" class="state-msg state-msg--error">
      {{ store.error }}
    </div>
    <div v-else-if="store.jobs.length === 0" class="state-msg">
      You haven't posted any jobs yet.
    </div>
    <div v-else class="job-feed__list">
      <article v-for="job in store.jobs" :key="job.id" class="job-card">
        <div class="job-card__body">
          <div>
            <h2 class="job-card__title">{{ job.title }}</h2>
            <p class="job-card__meta">{{ job.district }} · Posted {{ job.createdAt }}</p>
            <p class="job-card__sub">0 applicants · Open for applications</p>
          </div>
          <span class="badge" :class="urgencyClass[job.urgency]">
            {{ urgencyLabel[job.urgency] }}
          </span>
        </div>
        <button class="btn btn--outline job-card__btn" @click="router.push(`/jobs/${job.id}/applicants`)">
          View applicants
        </button>
      </article>
    </div>
  </main>
</template>

<style scoped>
.job-feed {
  flex: 1;
  width: 100%;
  padding: 2.5rem clamp(1.5rem, 3.5vw, 4rem);
  box-sizing: border-box;
}

.job-feed__topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.job-feed__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.job-card {
  border: 1.5px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.job-card__body {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.job-card__title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-teal);
  margin: 0 0 0.3rem;
}

.job-card__meta {
  color: var(--color-text-muted);
  margin: 0 0 0.25rem;
  font-size: 0.9rem;
}

.job-card__sub {
  color: var(--color-text-muted);
  margin: 0;
  font-size: 0.9rem;
}

.job-card__btn {
  align-self: flex-end;
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
</style>

