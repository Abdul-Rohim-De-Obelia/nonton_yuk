<!-- File ini diletakkan di: src/views/HomeView.vue -->
<script setup>
import { onMounted, computed } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import MovieGrid from '@/components/movie/MovieGrid.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const store = useMoviesStore()
onMounted(() => { if (!store.movies.length) store.fetchAll() })

// Film unggulan pertama untuk hero
const hero = computed(() => store.featured[0])
</script>

<template>
  <div>
    <LoadingSpinner v-if="store.loading && !store.movies.length" />

    <template v-else>
      <!-- HERO -->
      <section v-if="hero" class="relative h-72 md:h-96 overflow-hidden">
        <img :src="hero.backdrop_url || hero.poster_url" :alt="hero.title"
          class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/40 to-transparent"></div>
        <div class="absolute bottom-0 p-6 md:p-10 max-w-2xl">
          <h1 class="text-2xl md:text-4xl font-bold text-cream font-sans">{{ hero.title }}</h1>
          <p class="text-cream/80 text-sm mt-2 line-clamp-2">{{ hero.description }}</p>
          <router-link :to="{ name: 'detail', params: { id: hero.id } }"
            class="inline-block mt-4 px-6 py-2 bg-accent text-white rounded-xl text-sm hover:bg-accent/90">
            Tonton Sekarang
          </router-link>
        </div>
      </section>

      <!-- GRID -->
      <MovieGrid :movies="store.movies" title="Film Terbaru" />

      <!-- GENRE LINKS -->
      <section class="max-w-7xl mx-auto px-4 pb-8">
        <h2 class="text-lg font-semibold mb-3 text-brown">Jelajahi Genre</h2>
        <div class="flex flex-wrap gap-2">
          <router-link v-for="g in store.genres" :key="g.id"
            :to="{ name: 'genre', params: { name: g.name } }"
            class="px-4 py-1.5 rounded-xl bg-white border border-accent/20 text-sm hover:bg-accent hover:text-white transition-colors">
            {{ g.name }}
          </router-link>
        </div>
      </section>
    </template>
  </div>
</template>
