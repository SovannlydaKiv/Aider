<!-- src/pages/ReviewPage.vue -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'

const route = useRoute()
const router = useRouter()
const jobsStore = useJobsStore()

const jobId = computed(() => Number(route.params.id))
const job = computed(() => jobsStore.jobs.find((j) => j.id === jobId.value))

const rating = ref(0)
const comment = ref('')
const pending = ref(false)
const submitted = ref(false)
const error = ref('')

onMounted(() => {
  if (!jobsStore.jobs.length) jobsStore.fetchAll()
})

const starLabels = ['1 star', '2 stars', '3 stars', '4 stars', '5 stars']

async function onSubmit() {
  if (rating.value === 0) {
    error.value = 'Please choose a star rating.'
    return
  }
  error.value = ''
  pending.value = true
  try {
    const review = {
      jobId: jobId.value,
      rating_score: rating.value,
      comment: comment.value.trim(),
      created_at: new Date().toISOString().slice(0, 10),
    }
    const res = await fetch('http://localhost:3000/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    })
    if (!res.ok) throw new Error('Failed to submit review')
    submitted.value = true
    router.push('/jobs')
  } catch {
    error.value = 'Something went wrong. Please try again.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <main class="review-page">
    <div class="review-page__topbar">
      <h1 class="page-title">Rate &amp; review</h1>
      <button class="btn btn--outline" @click="router.push('/jobs')">← Back to My jobs</button>
    </div>

    <div v-if="job" class="review-page__helper-card">
      <div class="avatar avatar--lg">?</div>
      <div>
        <p class="review-page__job-title">{{ job.title }}</p>
        <p class="review-page__job-meta">{{ job.district }}</p>
      </div>
    </div>

    <form class="review-page__form" @submit.prevent="onSubmit" novalidate>
      <h2 class="review-page__question">How would you rate this helper?</h2>
      <div class="chip-group">
        <button
          v-for="(label, idx) in starLabels"
          :key="label"
          type="button"
          class="chip"
          :class="{ 'chip--active': rating === idx + 1 }"
          @click="rating = idx + 1"
        >
          {{ label }}
        </button>
      </div>

      <div class="form-group">
        <label class="form-label" for="comment">Your review</label>
        <textarea
          id="comment"
          class="form-input form-input--textarea"
          placeholder="Write a review for the helper"
          v-model="comment"
          rows="5"
        />
      </div>

      <p v-if="error" class="form-error">{{ error }}</p>

      <button class="btn btn--primary review-page__submit" type="submit" :disabled="pending">
        {{ pending ? 'Submitting…' : 'Submit review' }}
      </button>
    </form>
  </main>
</template>

<style scoped>
.review-page {
  flex: 1;
  width: 100%;
  padding: 2.5rem clamp(1.5rem, 3.5vw, 4rem);
  box-sizing: border-box;
}

.review-page__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.review-page__helper-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  border: 1.5px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 2rem;
  background: #fff;
  max-width: 850px;
}

.review-page__job-title {
  font-weight: 700;
  color: var(--color-teal);
  margin: 0 0 0.25rem;
  font-size: 1.05rem;
}

.review-page__job-meta {
  color: var(--color-text-muted);
  margin: 0;
  font-size: 0.9rem;
}

.review-page__form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 850px;
}

.review-page__question {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-teal);
  margin: 0;
}

.review-page__submit {
  padding: 1rem;
  font-size: 1.1rem;
}

.chip-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>

