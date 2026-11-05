import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/HomePage.vue'),
      meta: { requiresRole: null },
    },
    {
      path: '/helpers',
      component: () => import('@/pages/HelperListPage.vue'),
    },
    {
      path: '/helpers/:id',
      component: () => import('@/pages/HelperDetailPage.vue'),
    },
    {
      path: '/jobs',
      component: () => import('@/pages/JobFeedPage.vue'),
      meta: { requiresRole: 'client' },
    },
    {
      path: '/jobs/:id/applicants',
      component: () => import('@/pages/ApplicantsPage.vue'),
      meta: { requiresRole: 'client' },
    },
    {
      path: '/jobs/new',
      component: () => import('@/pages/JobFormPage.vue'),
      meta: { requiresRole: 'client' },
    },
    {
      path: '/review',
      component: () => import('@/pages/ReviewListPage.vue'),
      meta: { requiresRole: 'client' },
    },
    {
      path: '/jobs/:id/review',
      component: () => import('@/pages/ReviewPage.vue'),
      meta: { requiresRole: 'client' },
    },
  ],
})

// Route guard: pages marked requiresRole need the session role to match
router.beforeEach((to) => {
  const session = useSessionStore()
  const required = to.meta.requiresRole as string | undefined | null
  if (required && session.role !== required) {
    return '/'
  }
})

export default router
