
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getMovieById } from '@/services/movieService'
import { recordWatch } from '@/services/userService'
import { useAuthStore } from '@/stores/auth'
import VideoPlayer from '@/components/movie/VideoPlayer.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const route = useRoute()
const auth = useAuthStore()
const movie = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    movie.value = await getMovieById(route.params.id)
    // Catat ke riwayat tontonan
    if (auth.isLoggedIn) await recordWatch(auth.user.id, movie.value.id)
  } finally { loading.value = false }
})
</script>

<template>
  <LoadingSpinner v-if="loading" />
  <div v-else-if="movie" class="max-w-5xl mx-auto px-4 py-8">
    <VideoPlayer :src="movie.video_url" :poster="movie.backdrop_url" />
    <h1 class="text-xl font-semibold mt-4 text-brown">{{ movie.title }}</h1>
    <p class="text-sm text-brown-soft mt-1">{{ movie.year }} • {{ movie.genres?.name }}</p>
    <p class="mt-3 text-brown-soft leading-relaxed text-sm">{{ movie.description }}</p>
    <router-link :to="{ name: 'detail', params: { id: movie.id } }"
      class="inline-block mt-4 text-accent text-sm hover:underline">← Kembali ke detail</router-link>
  </div>
</template>
