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
      h-18
      px-6

      flex items-center gap-4

      rounded-3xl

      bg-white/35
      backdrop-blur-2xl

      border border-white/50

      shadow-[0_10px_35px_rgba(0,0,0,0.08)]
      "
    >
      <!-- Logo -->
      <router-link
        to="/"
        class="
        shrink-0
        text-2xl
        font-bold
        tracking-wide
        text-[#C8A27C]
        "
      >
        Nonton<span class="text-[#4B3A2F]">Yuk</span>
      </router-link>

      <!-- Search -->
      <div class="hidden md:flex flex-1 max-w-lg mx-4">
        <div
          class="
          flex w-full

          bg-white/50
          backdrop-blur-xl

          border border-white/60

          rounded-2xl
          overflow-hidden
          "
        >
          <input
            v-model="q"
            @keyup.enter="doSearch"
            type="text"
            placeholder="Cari film favoritmu..."
            class="
            flex-1
            px-4 py-3

            bg-transparent
            outline-none

            text-sm
            text-[#2D2A26]

            placeholder:text-[#8B8178]
            "
          />

          <button
            @click="doSearch"
            class="
            px-5

            bg-[#C8A27C]
            text-white

            hover:bg-[#B88C61]
            transition
            "
          >
            Cari
          </button>
        </div>
      </div>

      <!-- Auth Menu -->
      <div class="ml-auto flex items-center gap-3">

        <template v-if="auth.isLoggedIn">

          <router-link
            to="/profile"
            class="
            px-4 py-2

            rounded-xl

            bg-white/40
            border border-white/50

            text-[#2D2A26]
            hover:bg-white/60

            transition
            "
          >
            Profil
          </router-link>

          <button
            @click="handleLogout"
            class="
            px-4 py-2

            rounded-xl

            bg-[#4B3A2F]
            text-white

            hover:bg-[#5B473A]

            transition
            "
          >
            Keluar
          </button>

        </template>

        <template v-else>

          <router-link
            to="/login"
            class="
            px-4 py-2

            rounded-xl

            bg-white/40
            border border-white/50

            text-[#2D2A26]

            hover:bg-white/60

            transition
            "
          >
            Masuk
          </router-link>

          <router-link
            to="/register"
            class="
            px-4 py-2

            rounded-xl

            bg-[#C8A27C]
            text-white

            hover:bg-[#B88C61]

            transition
            "
          >
            Daftar
          </router-link>

        </template>

      </div>
    </nav>
  </header>
</template>
