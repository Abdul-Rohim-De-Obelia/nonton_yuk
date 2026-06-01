<!-- File ini diletakkan di: src/components/common/AppNavbar.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const q = ref('')
const open = ref(false)

function doSearch() {
  if (q.value.trim()) router.push({ name: 'search', query: { q: q.value.trim() } })
}
async function handleLogout() {
  await auth.logout(); router.push('/')
}
</script>

<template>
  <nav class="sticky top-0 z-50 w-full px-6 py-4 bg-white/40 backdrop-blur-md border-b border-white/50 shadow-sm transition-all duration-300">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <!-- Logo / Title -->
      <h1 class="text-2xl font-extrabold text-gray-800 tracking-widest drop-shadow-sm">
        NONTON<span class="text-amber-600">YUK</span>
      </h1>
      
      <!-- Navigation Links -->
      <ul class="flex gap-8 text-gray-700 font-medium">
        <li class="hover:text-amber-600 transition-colors cursor-pointer">Home</li>
        <li class="hover:text-amber-600 transition-colors cursor-pointer">Movies</li>
        <li class="hover:text-amber-600 transition-colors cursor-pointer">Profile</li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// Logika navbar bisa ditambahkan di sini
</script>
