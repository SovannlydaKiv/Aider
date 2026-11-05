<!-- src/pages/ApplicantsPage.vue -->
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import { useHelpersStore } from '@/stores/helpers'
import type { Urgency } from '@/types'

const route = useRoute()
const router = useRouter()
const jobsStore = useJobsStore()
const helpersStore = useHelpersStore()

const jobId = computed(() => Number(route.params.id))
const job = computed(() => jobsStore.jobs.find((j) => j.id === jobId.value))

onMounted(() => {
  if (!jobsStore.jobs.length) jobsStore.fetchAll()
  if (!helpersStore.helpers.length) helpersStore.fetchAll()
})

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

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function onApprove(helperName: string) {
  window.alert(`Approved ${helperName}! They will be notified immediately.`)
}
</script>

<template>
  <main class="applicants-page">
    <div class="applicants-page__topbar">
      <h1 class="page-title">Applicants</h1>
      <button class="btn btn--outline" @click="router.push('/jobs')">← Back to my jobs</button>
    </div>

    <!-- Job Summary Header Banner -->
    <div v-if="job" class="job-banner">
      <div class="job-banner__info">
        <h2 class="job-banner__title">{{ job.title }}</h2>
        <p class="job-banner__meta">
          {{ job.district }} · {{ helpersStore.helpers.length }} applicants · Open for applications
        </p>
      </div>
      <span class="badge" :class="urgencyClass[job.urgency]">
        {{ urgencyLabel[job.urgency] }}
      </span>
    </div>

    <p class="applicants-page__instruction">
      Read a profile before you choose. Approve the helper you would like to hire.
    </p>

    <!-- Applicants List -->
    <div class="applicants-list">
      <article
        v-for="helper in helpersStore.helpers"
        :key="helper.id"
        class="applicant-card"
      >
        <div class="applicant-card__main">
          <div class="avatar">{{ initials(helper.name) }}</div>
          <div>
            <h3 class="applicant-card__name">{{ helper.name }}</h3>
            <p class="applicant-card__meta">
              ★ 4.9 · {{ helper.district }}
            </p>
            <p v-if="helper.degrees.length" class="applicant-card__degree">
              {{ helper.degrees.join(', ') }}
              <span class="badge badge--verified">Verified ✓</span>
            </p>
          </div>
        </div>

        <div class="applicant-card__actions">
          <button
            class="btn btn--outline"
            @click="router.push(`/helpers/${helper.id}`)"
          >
            View profile
          </button>
          <button
            class="btn btn--primary"
            @click="onApprove(helper.name)"
          >
            Approve
          </button>
          <button
            class="btn btn--outline btn--danger"
            @click="router.push('/jobs')"
          >
            Decline
          </button>
        </div>
      </article>
    </div>
  </main>
</template>

<style scoped>
.applicants-page {
  flex: 1;
  width: 100%;
  padding: 2.5rem clamp(1.5rem, 3.5vw, 4rem);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.applicants-page__topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.job-banner {
  border: 1.5px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.job-banner__title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-teal);
  margin: 0 0 0.35rem;
}

.job-banner__meta {
  color: var(--color-text-muted);
  margin: 0;
  font-size: 0.95rem;
}

.applicants-page__instruction {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  margin: 0;
}

.applicants-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.applicant-card {
  border: 1.5px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.applicant-card__main {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.applicant-card__name {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-teal);
  margin: 0 0 0.2rem;
}

.applicant-card__meta {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin: 0 0 0.2rem;
}

.applicant-card__degree {
  font-size: 0.88rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.applicant-card__actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}
</style>

