
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
  <header class="sticky top-0 z-50 bg-cream-light/90 backdrop-blur border-b border-accent/10">
    <nav class="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
      <router-link to="/" class="font-semibold text-xl text-accent font-sans">Nonton<span class="text-brown">Yuk</span></router-link>

      <div class="hidden md:flex flex-1 max-w-md mx-4">
        <input v-model="q" @keyup.enter="doSearch" type="text" placeholder="Cari film..."
          class="w-full px-4 py-2 rounded-l-xl bg-white border border-accent/20 focus:outline-none focus:border-accent text-sm" />
        <button @click="doSearch" class="px-4 bg-accent text-white rounded-r-xl text-sm hover:bg-accent/90">Cari</button>
      </div>

      <div class="ml-auto flex items-center gap-3">
        <template v-if="auth.isLoggedIn">
          <router-link to="/profile" class="text-sm hover:text-accent">Profil</router-link>
          <button @click="handleLogout" class="text-sm px-3 py-1.5 rounded-xl bg-brown text-cream hover:bg-brown-soft">Keluar</button>
        </template>
        <template v-else>
          <router-link to="/login" class="text-sm hover:text-accent">Masuk</router-link>
          <router-link to="/register" class="text-sm px-3 py-1.5 rounded-xl bg-accent text-white hover:bg-accent/90">Daftar</router-link>
        </template>
      </div>
    </nav>
  </header>
</template>

