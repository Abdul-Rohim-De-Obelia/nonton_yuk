// File ini diletakkan di: src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/movie/:id', name: 'detail', component: () => import('@/views/MovieDetailView.vue') },
  { path: '/watch/:id', name: 'watch', component: () => import('@/views/WatchView.vue'), meta: { requiresAuth: true } },
  { path: '/genre/:name', name: 'genre', component: () => import('@/views/GenreView.vue') },
  { path: '/search', name: 'search', component: () => import('@/views/SearchView.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
  { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue') },
  { path: '/profile', name: 'profile', component: () => import('@/views/ProfileView.vue'), meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('@/views/NotFoundView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

// AUTH GUARD: proteksi halaman yang butuh login
router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (!auth.user) await auth.init() // pastikan sesi sudah dipulihkan
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
