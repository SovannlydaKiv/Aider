<!-- src/pages/HomePage.vue -->
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <main class="home-page">
    <div class="home-container">
      <h1 class="home-page__heading">Hello! What do you need today?</h1>
      <p class="home-page__sub">Find trusted help for yourself or someone you care about.</p>

      <!-- Primary Action: Post a job -->
      <button
        class="home-btn home-btn--primary"
        @click="router.push('/jobs/new')"
      >
        + Post a job
      </button>
      <p class="home-page__hint">Tell us what you need. Helpers can apply to your job.</p>

      <!-- Centered divider -->
      <div class="home-page__or-wrap">
        <span class="home-page__or">or</span>
      </div>

      <!-- Secondary Action: Find a helper -->
      <button
        class="home-btn home-btn--outline"
        @click="router.push('/helpers')"
      >
        Find a helper
      </button>
      <p class="home-page__hint">Browse helpers, read reviews and choose someone you feel good about.</p>

      <!-- Reassurance Note -->
      <div class="home-page__assurance">
        <p class="home-page__assurance-title">You are always in control.</p>
        <p class="home-page__assurance-text">Nothing is confirmed until you approve a helper.</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home-page {
  flex: 1;
  width: 100%;
  padding: 3.5rem clamp(2rem, 5vw, 6rem);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.home-container {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
}

.home-page__heading {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-teal);
  letter-spacing: -0.01em;
  margin: 0 0 0.5rem;
}

.home-page__sub {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin: 0 0 2.25rem;
}

/* Big buttons filling the container width */
.home-btn {
  width: 100%;
  min-height: 60px;
  border-radius: 12px;
  font-size: 1.15rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  box-sizing: border-box;
}

.home-btn--primary {
  background: var(--color-pink);
  color: #fff;
  border: 2px solid var(--color-pink);
  box-shadow: 0 3px 10px rgba(232, 121, 160, 0.25);
}

.home-btn--primary:hover {
  background: var(--color-pink-hover);
  border-color: var(--color-pink-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(232, 121, 160, 0.35);
}

.home-btn--primary:active {
  transform: translateY(0);
}

.home-btn--outline {
  background: #fff;
  color: var(--color-pink);
  border: 2px solid var(--color-pink);
}

.home-btn--outline:hover {
  background: var(--color-pink-light);
  border-color: var(--color-pink-hover);
  color: var(--color-pink-hover);
  transform: translateY(-1px);
}

.home-btn--outline:active {
  transform: translateY(0);
}

.home-page__hint {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.4;
  margin: 0.75rem 0 0;
}

.home-page__or-wrap {
  width: 100%;
  text-align: center;
  margin: 1.5rem 0;
}

.home-page__or {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  font-weight: 500;
}

.home-page__assurance {
  margin-top: 3.5rem;
  padding-top: 1rem;
}

.home-page__assurance-title {
  font-weight: 700;
  color: var(--color-teal);
  font-size: 1.1rem;
  margin: 0 0 0.35rem;
}

.home-page__assurance-text {
  color: var(--color-teal);
  font-size: 1.05rem;
  margin: 0;
  line-height: 1.4;
}
</style>
