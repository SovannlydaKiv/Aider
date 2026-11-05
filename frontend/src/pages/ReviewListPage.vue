<!-- src/pages/ReviewListPage.vue -->
<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import type { Urgency } from '@/types'

const router = useRouter()
const store = useJobsStore()

onMounted(() => store.fetchAll())

// For demo purposes show all open jobs as reviewable
const reviewableJobs = computed(() => store.jobs)

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
</script>

<template>
  <main class="review-list">
    <h1 class="page-title">Rate &amp; review</h1>
    <p class="page-sub">Leave a rating for a helper after a job is complete.</p>

    <div v-if="store.status === 'loading'" class="state-msg">Loading jobs…</div>
    <div v-else-if="store.status === 'error'" class="state-msg state-msg--error">
      {{ store.error }}
    </div>
    <div v-else-if="reviewableJobs.length === 0" class="state-msg">
      No completed jobs to review yet.
    </div>
    <div v-else class="review-list__list">
      <article
        v-for="job in reviewableJobs"
        :key="job.id"
        class="review-job-card"
      >
        <div class="review-job-card__body">
          <div>
            <h2 class="review-job-card__title">{{ job.title }}</h2>
            <p class="review-job-card__meta">
              {{ job.district }} · Posted {{ job.createdAt }}
            </p>
          </div>
          <span class="badge" :class="urgencyClass[job.urgency]">
            {{ urgencyLabel[job.urgency] }}
          </span>
        </div>
        <button
          class="btn btn--primary review-job-card__btn"
          @click="router.push(`/jobs/${job.id}/review`)"
        >
          Rate &amp; review helper
        </button>
      </article>
    </div>
  </main>
</template>

<style scoped>
.review-list {
  flex: 1;
  width: 100%;
  padding: 2.5rem clamp(1.5rem, 3.5vw, 4rem);
  box-sizing: border-box;
}

.review-list__list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
}

.review-job-card {
  border: 1.5px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 0.15s;
}

.review-job-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
}

.review-job-card__body {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.review-job-card__title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-teal);
  margin: 0 0 0.3rem;
}

.review-job-card__meta {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin: 0;
}

.review-job-card__btn {
  align-self: flex-start;
}
</style>

