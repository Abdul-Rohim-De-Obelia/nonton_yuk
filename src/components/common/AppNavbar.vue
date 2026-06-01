<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const q = ref('')

// State untuk efek scroll navbar
const isScrolled = ref(false)

// Fungsi untuk mendeteksi scroll
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function doSearch() {
  if (q.value.trim()) {
    router.push({ name: 'search', query: { q: q.value.trim() } })
  }
}

async function handleLogout() {
  await auth.logout()
  router.push('/')
}
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out',
      isScrolled
        ? 'bg-[#FDFBF7]/75 backdrop-blur-md border-b border-white/60 shadow-[0_4px_30px_rgba(74,64,54,0.05)] py-3'
        : 'bg-transparent py-5'
    ]"
  >
    <nav class="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-6">
      
      <router-link to="/" class="font-bold text-2xl tracking-wide text-[#4A4036] shrink-0">
        Nonton<span class="text-[#827364] font-medium">Yuk</span>
      </router-link>

      <div class="hidden md:flex flex-1 max-w-lg mx-auto relative group">
        <input 
          v-model="q" 
          @keyup.enter="doSearch" 
          type="text" 
          placeholder="Cari film..."
          class="w-full pl-5 pr-12 py-2.5 rounded-full bg-white/50 backdrop-blur-sm border border-[#E8D5C4] focus:outline-none focus:border-[#827364] focus:bg-white transition-all text-[#4A4036] text-sm placeholder-[#827364]/60 shadow-sm" 
        />
        <button 
          @click="doSearch" 
          class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#827364] hover:text-[#4A4036] transition-colors"
          aria-label="Cari"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-5 shrink-0">
        <template v-if="auth.isLoggedIn">
          <router-link to="/profile" class="text-sm font-medium text-[#6B5E50] hover:text-[#4A4036] transition-colors">
            Profil
          </router-link>
          <button 
            @click="handleLogout" 
            class="text-sm font-medium px-5 py-2 rounded-full border border-[#4A4036] text-[#4A4036] hover:bg-[#4A4036] hover:text-[#FDFBF7] transition-all"
          >
            Keluar
          </button>
        </template>
        
        <template v-else>
          <router-link to="/login" class="text-sm font-medium text-[#6B5E50] hover:text-[#4A4036] transition-colors">
            Masuk
          </router-link>
          <router-link 
            to="/register" 
            class="text-sm font-medium px-5 py-2 rounded-full bg-[#4A4036] text-[#FDFBF7] hover:bg-[#2D2A26] shadow-md hover:shadow-lg transition-all"
          >
            Daftar
          </router-link>
        </template>
      </div>

    </nav>
  </header>
</template>
