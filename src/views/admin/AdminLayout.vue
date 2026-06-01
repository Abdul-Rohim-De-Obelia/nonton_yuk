<!-- File ini diletakkan di: src/views/admin/AdminLayout.vue -->
<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

async function logout() {
  await auth.logout()
  router.push({ name: 'login' })
}

const navItems = [
  { name: 'Dashboard', to: '/admin', icon: '🏠' },
  { name: 'Kelola Film', to: '/admin/movies', icon: '🎬' },
  { name: 'Kelola Genre', to: '/admin/genres', icon: '🏷️' },
]
</script>

<template>
  <div class="min-h-screen flex bg-cream">
    <!-- Sidebar -->
    <aside class="w-64 bg-brown flex flex-col fixed top-0 left-0 h-full z-40">
      <!-- Logo -->
      <div class="px-6 py-5 border-b border-brown-soft">
        <h1 class="text-white font-bold text-xl">🎥 Admin Panel</h1>
        <p class="text-accent-light text-xs mt-1 truncate">{{ auth.user?.email }}</p>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-4 py-6 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
            route.path === item.to
              ? 'bg-accent text-white'
              : 'text-gray-300 hover:bg-brown-soft hover:text-white'
          ]"
        >
          <span>{{ item.icon }}</span>
          {{ item.name }}
        </router-link>
      </nav>

      <!-- Footer sidebar -->
      <div class="px-4 py-4 border-t border-brown-soft space-y-2">
        <router-link
          to="/"
          class="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-brown-soft hover:text-white transition-colors"
        >
          ← Kembali ke Website
        </router-link>
        <button
          @click="logout"
          class="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
        >
          🚪 Logout
        </button>
      </div>
    </aside>

    <!-- Konten utama -->
    <main class="flex-1 ml-64 p-8 min-h-screen">
      <router-view />
    </main>
  </div>
</template>
