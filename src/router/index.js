
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/movie/:id', name: 'detail', component: () => import('@/views/MovieDetailView.vue') },
  { path: '/watch/:id', name: 'watch', component: () => import('@/views/WatchView.vue') },
  { path: '/genre/:name', name: 'genre', component: () => import('@/views/GenreView.vue') },
  { path: '/search', name: 'search', component: () => import('@/views/SearchView.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
  { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue') },
  { path: '/profile', name: 'profile', component: () => import('@/views/ProfileView.vue'), meta: { requiresAuth: true } },

  // Halaman Admin
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', name: 'admin', component: () => import('@/views/admin/AdminDashboard.vue') },
      { path: 'movies', name: 'admin-movies', component: () => import('@/views/admin/AdminMovies.vue') },
      { path: 'genres', name: 'admin-genres', component: () => import('@/views/admin/AdminGenres.vue') },
    ]
  },

  { path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('@/views/NotFoundView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

// AUTH GUARD
router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (!auth.user) await auth.init()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return { name: 'home' }
  }
})

export default router
