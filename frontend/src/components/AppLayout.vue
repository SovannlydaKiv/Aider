<!-- src/components/AppLayout.vue -->
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import logoUrl from '@/assets/logo.png'

const router = useRouter()
const route = useRoute()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Find helpers', to: '/helpers' },
  { label: 'My jobs', to: '/jobs' },
]

function isActive(path: string) {
  return path === '/' ? route.path === '/' : route.path.startsWith(path)
}
</script>

<template>
  <div class="layout">
    <!-- Top Header -->
    <header class="layout__header">
      <div class="layout__brand" @click="router.push('/')">
        <img :src="logoUrl" alt="Aider Logo" class="layout__logo-img" />
        <span class="layout__app-name">Aider</span>
      </div>
      <div class="layout__user-info">
        Client account · Phnom Penh
      </div>
    </header>

    <div class="layout__body">
      <!-- Left Sidebar -->
      <nav class="layout__sidebar">
        <ul class="layout__nav">
          <li v-for="link in navLinks" :key="link.to">
            <button
              class="layout__nav-link"
              :class="{ 'layout__nav-link--active': isActive(link.to) }"
              @click="router.push(link.to)"
            >
              {{ link.label }}
            </button>
          </li>
        </ul>

        <div class="layout__review-cta">
          <p class="layout__review-label">Happy? Why not:</p>
          <button
            class="btn btn--outline layout__review-btn"
            :class="{ 'layout__nav-link--active': isActive('/review') }"
            @click="router.push('/review')"
          >
            Rate &amp; review
          </button>
        </div>
      </nav>

      <!-- Main Content Area -->
      <main class="layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fbfbfb;
}

.layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem clamp(1.5rem, 3vw, 3rem);
  border-bottom: 1.5px solid var(--color-border);
  background: #fff;
  height: 72px;
  box-sizing: border-box;
}

.layout__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.layout__logo-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: contain;
  display: block;
}

.layout__app-name {
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--color-teal);
  letter-spacing: -0.01em;
}

.layout__user-info {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.layout__body {
  display: flex;
  flex: 1;
  min-height: calc(100vh - 72px);
}

.layout__sidebar {
  width: clamp(220px, 18vw, 280px);
  flex-shrink: 0;
  border-right: 1.5px solid var(--color-border);
  padding: 2rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  box-sizing: border-box;
}

.layout__nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.layout__nav-link {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.85rem 1.25rem;
  border-radius: 12px;
  border: 1.5px solid transparent;
  background: transparent;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--color-teal);
  transition: all 0.15s ease;
}

.layout__nav-link:hover {
  background: var(--color-pink-light);
  color: var(--color-pink-hover);
}

.layout__nav-link--active {
  background: var(--color-pink-light);
  border-color: #f7d1e0;
  font-weight: 700;
  color: var(--color-teal);
}

.layout__review-cta {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.layout__review-label {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin: 0;
}

.layout__review-btn {
  font-weight: 700;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.95rem;
  border-color: #e5b9cb;
  color: var(--color-teal);
  background: #fff;
}

.layout__review-btn:hover {
  background: var(--color-pink-light);
}

.layout__content {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
</style>
