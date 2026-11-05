<!-- src/pages/JobFormPage.vue -->
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import type { NewJob, Urgency } from '@/types'

const router = useRouter()
const store = useJobsStore()

const districts = [
  'Sen Sok', 'Toul Kork', 'Chamkar Mon', 'Daun Penh',
  'Meanchey', 'Russey Keo', 'Por Senchey', 'Chroy Changvar',
]

type UrgencyOption = { label: string; value: Urgency }
const urgencyOptions: UrgencyOption[] = [
  { label: 'Today', value: 'urgent' },
  { label: 'This week', value: 'normal' },
  { label: 'Any time', value: 'low' },
]

const form = reactive({
  title: '',
  description: '',
  district: 'Sen Sok',
  urgency: 'normal' as Urgency,
})

const errors = reactive({ title: '' })
const pending = ref(false)
const submitted = ref(false)

function validate() {
  errors.title = form.title.trim() ? '' : 'Please tell us what you need help with.'
  return !errors.title
}

async function onSubmit() {
  if (!validate()) return
  pending.value = true
  try {
    const newJob: NewJob = {
      clientId: 1,
      title: form.title.trim(),
      description: form.description.trim(),
      timeType: 'part_time',
      urgency: form.urgency,
      district: form.district,
      status: 'open',
      createdAt: new Date().toISOString().slice(0, 10),
    }
    await store.create(newJob)
    submitted.value = true
    router.push('/jobs')
  } catch {
    errors.title = 'Something went wrong. Please try again.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <main class="job-form">
    <p class="job-form__back">
      <button class="link-btn" @click="router.push('/jobs')">← My jobs</button>
    </p>
    <h1 class="page-title">Post a job</h1>

    <form class="job-form__form" @submit.prevent="onSubmit" novalidate>
      <!-- Field 1: What you need -->
      <div class="form-group">
        <label class="form-label" for="title">What you need</label>
        <input
          id="title"
          class="form-input"
          :class="{ 'form-input--error': errors.title }"
          type="text"
          placeholder="e.g. Help with groceries"
          v-model="form.title"
        />
        <p v-if="errors.title" class="form-error">{{ errors.title }}</p>
      </div>

      <!-- Field 2: Details -->
      <div class="form-group">
        <label class="form-label" for="description">Details</label>
        <textarea
          id="description"
          class="form-input form-input--textarea"
          placeholder="Tell helpers a little more."
          v-model="form.description"
          rows="4"
        />
      </div>

      <!-- Field 3: Area -->
      <div class="form-group">
        <label class="form-label" for="district">Area</label>
        <select id="district" class="form-input form-input--select" v-model="form.district">
          <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
        </select>
      </div>

      <!-- Field 4: How soon -->
      <div class="form-group">
        <label class="form-label">How soon?</label>
        <div class="chip-group">
          <button
            v-for="opt in urgencyOptions"
            :key="opt.value"
            type="button"
            class="chip"
            :class="{ 'chip--active': form.urgency === opt.value }"
            @click="form.urgency = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <button class="btn btn--primary job-form__submit" type="submit" :disabled="pending">
        {{ pending ? 'Posting…' : 'Post job' }}
      </button>
    </form>
  </main>
</template>

<style scoped>
.job-form {
  flex: 1;
  width: 100%;
  padding: 2.5rem clamp(1.5rem, 3.5vw, 4rem);
  box-sizing: border-box;
}

.job-form__back {
  margin: 0 0 1rem;
}

.job-form__form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
  width: 100%;
  max-width: 850px;
}

.job-form__submit {
  padding: 1rem;
  font-size: 1.1rem;
}

.chip-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>

