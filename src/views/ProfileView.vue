<!-- File ini diletakkan di: src/views/ProfileView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { getFavorites, getWatchHistory } from '@/services/userService'
import MovieGrid from '@/components/movie/MovieGrid.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const auth = useAuthStore()
const favorites = ref([])
const history = ref([])
const loading = ref(true)
const tab = ref('favorites')

onMounted(async () => {
  try {
    const fav = await getFavorites(auth.user.id)
    const his = await getWatchHistory(auth.user.id)
    favorites.value = fav.map(f => f.movies)
    history.value = his.map(h => h.movies)
  } finally { loading.value = false }
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header profil -->
    <div class="flex items-center gap-4">
      <div class="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-semibold">
        {{ (auth.user?.user_metadata?.full_name || auth.user?.email || '?')[0].toUpperCase() }}
      </div>
      <div>
        <h1 class="text-xl font-semibold text-brown">
          {{ auth.user?.user_metadata?.full_name || 'Pengguna' }}
        </h1>
        <p class="text-sm text-brown-soft">{{ auth.user?.email }}</p>
      </div>
    </div>

    <!-- Tab -->
    <div class="flex gap-2 mt-8 border-b border-accent/10">
      <button @click="tab='favorites'" class="px-4 py-2 text-sm"
        :class="tab==='favorites' ? 'text-accent border-b-2 border-accent font-medium' : 'text-brown-soft'">
        Favorit
      </button>
      <button @click="tab='history'" class="px-4 py-2 text-sm"
        :class="tab==='history' ? 'text-accent border-b-2 border-accent font-medium' : 'text-brown-soft'">
        Riwayat
      </button>
    </div>

    <LoadingSpinner v-if="loading" />
    <template v-else>
      <MovieGrid v-show="tab==='favorites'" :movies="favorites" />
      <MovieGrid v-show="tab==='history'" :movies="history" />
    </template>
  </div>
</template>
