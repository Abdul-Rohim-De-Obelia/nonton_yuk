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
  <header class="sticky top-4 z-50 px-4">
    <nav
      class="
      max-w-7xl mx-auto
      h-16
      px-6
      flex items-center justify-between

      rounded-3xl
      bg-white/40
      backdrop-blur-2xl
      border border-white/50

      shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      "
    >
      <!-- Logo -->
      <router-link
        to="/"
        class="
        flex items-center gap-2
        text-[#2D2A26]
        font-bold text-xl
        tracking-wide
        "
      >
        🎬
        <span>Nonton Yuk</span>
      </router-link>

      <!-- Menu -->
      <div
        class="
        hidden md:flex
        items-center gap-2

        bg-white/30
        px-2 py-2
        rounded-2xl
        "
      >
        <router-link
          to="/"
          class="nav-link"
        >
          Beranda
        </router-link>

        <router-link
          to="/favorites"
          class="nav-link"
        >
          Favorit
        </router-link>

        <router-link
          to="/history"
          class="nav-link"
        >
          Riwayat
        </router-link>
      </div>

      <!-- Right -->
      <div class="flex items-center gap-3">

        <!-- Search -->
        <div
          class="
          hidden md:flex
          items-center
          px-4 py-2

          rounded-xl
          bg-white/30
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Cari film..."
            class="
            ml-2
            bg-transparent
            outline-none
            text-sm
            w-36
            "
          />
        </div>

        <!-- Profile -->
        <button
          class="
          w-10 h-10
          rounded-full

          bg-[#C8A27C]
          text-white
          font-semibold

          hover:scale-105
          transition
          "
        >
          J
        </button>
      </div>
    </nav>
  </header>
</template>
