
<script setup>
import MovieCard from './MovieCard.vue'
defineProps({
  movies: { type: Array, default: () => [] },
  title: { type: String, default: '' }
})
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-6">
    <h2 v-if="title" class="text-lg font-semibold mb-4 text-brown font-sans">{{ title }}</h2>
    <div v-if="movies.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <MovieCard v-for="m in movies" :key="m.id" :movie="m" />
    </div>
    <p v-else class="text-center text-brown-soft py-8 text-sm">Tidak ada film untuk ditampilkan.</p>
  </section>
</template>
