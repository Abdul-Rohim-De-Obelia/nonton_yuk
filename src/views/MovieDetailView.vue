
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getMovieById } from '@/services/movieService'
import { useAuthStore } from '@/stores/auth'
import { isFavorite, addFavorite, removeFavorite } from '@/services/userService'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const route = useRoute()
const auth = useAuthStore()
const movie = ref(null)
const loading = ref(true)
const error = ref(null)
const fav = ref(false)

async function load() {
  loading.value = true; error.value = null
  try {
    movie.value = await getMovieById(route.params.id)
    if (auth.isLoggedIn) fav.value = await isFavorite(auth.user.id, movie.value.id)
  } catch (e) { error.value = e.message }
  finally { loading.value = false }
}

async function toggleFav() {
  if (!auth.isLoggedIn) return
  if (fav.value) { await removeFavorite(auth.user.id, movie.value.id); fav.value = false }
  else { await addFavorite(auth.user.id, movie.value.id); fav.value = true }
}

onMounted(load)
watch(() => route.params.id, load)
</script>

<template>
  <LoadingSpinner v-if="loading" />
  <p v-else-if="error" class="text-center py-12 text-red-500">{{ error }}</p>

  <article v-else-if="movie" class="max-w-5xl mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <img :src="movie.poster_url" :alt="movie.title"
        class="w-48 md:w-64 rounded-xl shadow-md mx-auto md:mx-0" />
      <div class="flex-1">
        <h1 class="text-2xl md:text-3xl font-bold text-brown">{{ movie.title }}</h1>
        <div class="flex flex-wrap gap-3 mt-2 text-sm text-brown-soft">
          <span>{{ movie.year }}</span>
          <span v-if="movie.duration">• {{ movie.duration }} menit</span>
          <span v-if="movie.rating">• ⭐ {{ movie.rating }}</span>
          <span v-if="movie.genres">• {{ movie.genres.name }}</span>
        </div>
        <p class="mt-4 text-brown-soft leading-relaxed">{{ movie.description }}</p>

        <div class="flex gap-3 mt-6">
          <router-link :to="{ name: 'watch', params: { id: movie.id } }"
            class="px-6 py-2.5 bg-accent text-white rounded-xl text-sm hover:bg-accent/90">
            ▶ Tonton
          </router-link>
          <button v-if="auth.isLoggedIn" @click="toggleFav"
            class="px-6 py-2.5 rounded-xl text-sm border border-accent/30"
            :class="fav ? 'bg-accent/10 text-accent' : 'bg-white text-brown hover:bg-cream'">
            {{ fav ? '♥ Favorit' : '♡ Tambah Favorit' }}
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
