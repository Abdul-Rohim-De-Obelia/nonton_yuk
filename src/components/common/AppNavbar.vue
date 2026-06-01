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
  <header
    class="sticky top-4 z-50 max-w-7xl mx-auto px-4"
  >
    <nav
      class="
      flex items-center justify-between
      px-6 py-4
      rounded-3xl
      bg-white/30
      backdrop-blur-xl
      border border-white/50
      shadow-lg"
    >
      <router-link
        to="/"
        class="text-2xl font-bold text-[#2D2A26]"
      >
        Nonton Yuk
      </router-link>

      <div class="hidden md:flex gap-8">
        <router-link
          to="/"
          class="text-[#2D2A26] hover:text-[#C8A27C]"
        >
          Home
        </router-link>

        <router-link
          to="/favorites"
          class="text-[#2D2A26] hover:text-[#C8A27C]"
        >
          Favorit
        </router-link>

        <router-link
          to="/history"
          class="text-[#2D2A26] hover:text-[#C8A27C]"
        >
          Riwayat
        </router-link>
      </div>

      <button
        class="
        px-4 py-2
        rounded-xl
        bg-[#C8A27C]
        text-white
        hover:scale-105
        transition"
      >
        Login
      </button>
    </nav>
  </header>
</template>
