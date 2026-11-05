<!-- src/pages/HelperDetailPage.vue -->
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHelpersStore } from '@/stores/helpers'

const route = useRoute()
const router = useRouter()
const store = useHelpersStore()

const id = computed(() => route.params.id)
const helper = computed(() => store.byId(id.value as string))

onMounted(async () => {
  if (!store.helpers.length) {
    await store.fetchAll()
  }
})

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

// Sample family reviews as shown in wireframe
const familyReviews = [
  {
    author: 'Keo Bopha',
    score: '5.0',
    date: '12 October 2026',
    comment: 'Mom is kind and always on time. My mother feels safe and comfortable with her.',
  },
  {
    author: 'Heng Rithy',
    score: '5.0',
    date: '4 October 2026',
    comment: "She listened carefully and made our father's daily routine much easier.",
  },
]
function onApprove() {
  window.alert('Helper application approved! They will contact you shortly.')
}
</script>

<template>
  <main class="helper-detail">
    <div class="helper-detail__topbar">
      <h1 class="page-title">Helper profile</h1>
      <button class="btn btn--outline" @click="router.push('/helpers')">← Back to helpers</button>
    </div>

    <div v-if="store.status === 'loading' || (!helper && store.status === 'idle')" class="loading-state">
      <div class="spinner"></div>
      <p class="loading-text">Loading profile…</p>
    </div>
    <div v-else-if="store.status === 'error'" class="state-msg state-msg--error">
      {{ store.error }}
    </div>
    <div v-else-if="!helper" class="state-msg state-msg--error">Helper not found.</div>
    <template v-else>
      <div class="helper-detail__card">
        <div class="helper-detail__header">
          <div class="avatar avatar--lg">{{ initials(helper.name) }}</div>
          <div class="helper-detail__header-info">
            <h2 class="helper-detail__name">{{ helper.name }}</h2>
            <div class="helper-detail__rating-row">
              <span class="stars">★★★★★</span>
              <span class="rating-text">4.9 out of 5 · 24 reviews</span>
            </div>
            <p class="helper-detail__degree">
              <template v-if="helper.degrees.length">
                {{ helper.degrees.join(', ') }}
                <span class="badge badge--verified">Verified ✓</span>
              </template>
              <template v-else>No formal degree</template>
            </p>
            <p class="helper-detail__meta">
              {{ experienceLabel[helper.experience] }} ·
              {{ availLabel[helper.availability] }} ·
              {{ helper.district }}
            </p>
          </div>
        </div>
        <p class="helper-detail__bio">{{ helper.bio }}</p>
      </div>

      <!-- What families say -->
      <section class="reviews-section">
        <div class="reviews-section__header">
          <h2 class="reviews-section__title">What families say</h2>
          <span class="reviews-section__count">24 reviews</span>
        </div>

        <div class="reviews-grid">
          <article v-for="rev in familyReviews" :key="rev.author" class="review-card">
            <div class="review-card__header">
              <span class="review-card__author">{{ rev.author }}</span>
              <span class="review-card__score">★ {{ rev.score }}</span>
            </div>
            <p class="review-card__comment">{{ rev.comment }}</p>
            <span class="review-card__date">{{ rev.date }}</span>
          </article>
        </div>
      </section>

      <!-- Action Footer -->
      <div class="helper-detail__actions">
        <p class="helper-detail__action-hint">Choose this helper for your job: Help with groceries · Sen Sok</p>
        <div class="helper-detail__action-btns">
          <button class="btn btn--primary" @click="onApprove">Approve</button>
          <button class="btn btn--outline btn--danger" @click="router.push('/helpers')">Decline</button>
        </div>
      </div>
    </template>
  </main>
</template>

<style scoped>
.helper-detail {
  flex: 1;
  width: 100%;
  padding: 2.5rem clamp(1.5rem, 3.5vw, 4rem);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.helper-detail__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.helper-detail__card {
  border: 1.5px solid var(--color-border);
  border-radius: 14px;
  padding: 2rem;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.helper-detail__header {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.helper-detail__name {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-teal);
  margin: 0 0 0.2rem;
}

.helper-detail__rating-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.stars {
  color: #f39c12;
  font-size: 1rem;
}

.rating-text {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.helper-detail__degree {
  margin: 0 0 0.35rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.helper-detail__meta {
  color: var(--color-text-muted);
  margin: 0;
  font-size: 0.95rem;
}

.helper-detail__bio {
  color: var(--color-text);
  line-height: 1.6;
  font-size: 1.05rem;
  margin: 0;
  border-top: 1px solid #f0f0f0;
  padding-top: 1rem;
}

/* Reviews */
.reviews-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reviews-section__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reviews-section__title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-teal);
  margin: 0;
}

.reviews-section__count {
  font-size: 0.95rem;
  color: var(--color-text-muted);
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
}

.review-card {
  border: 1.5px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.review-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-card__author {
  font-weight: 700;
  color: var(--color-teal);
}

.review-card__score {
  font-weight: 700;
  color: #f39c12;
  font-size: 0.95rem;
}

.review-card__comment {
  font-size: 0.92rem;
  color: var(--color-text);
  line-height: 1.5;
  margin: 0;
}

.review-card__date {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-top: auto;
}

/* Action Footer */
.helper-detail__actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: #fff;
  border: 1.5px solid var(--color-border);
  border-radius: 14px;
  padding: 1.5rem;
}

.helper-detail__action-hint {
  color: var(--color-teal);
  font-weight: 600;
  margin: 0;
}

.helper-detail__action-btns {
  display: flex;
  gap: 1rem;
}

.helper-detail__action-btns .btn {
  flex: 1;
  padding: 0.9rem;
  font-size: 1.05rem;
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
