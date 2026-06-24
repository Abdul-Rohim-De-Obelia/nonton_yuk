
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
  <div class="min-h-screen bg-[#F7F3EE]">

    <LoadingSpinner v-if="store.loading && !store.movies.length" />

    <template v-else>

      <!-- HERO -->
      <section
        v-if="hero"
        class="relative max-w-7xl mx-auto px-4 pt-8"
      >
        <div class="relative overflow-hidden rounded-[32px] h-[500px]">

          <img
            :src="hero.backdrop_url || hero.poster_url"
            :alt="hero.title"
            class="absolute inset-0 w-full h-full object-cover"
          />

          <div
            class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"
          ></div>

          <div
            class="absolute inset-0 backdrop-blur-[2px]"
          ></div>

          <div
            class="absolute left-8 bottom-8 md:left-12 md:bottom-12 max-w-xl"
          >
            <div
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full
              bg-white/20 backdrop-blur-xl border border-white/30
              text-white text-sm mb-4"
            >
              Featured Movie
            </div>

            <h1
              class="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              {{ hero.title }}
            </h1>

            <p
              class="text-white/80 text-base md:text-lg line-clamp-3"
            >
              {{ hero.description }}
            </p>

            <router-link
              :to="{ name: 'detail', params: { id: hero.id } }"
              class="inline-flex mt-6 px-8 py-3 rounded-2xl
              bg-[#C8A27C] text-white font-medium
              hover:scale-105 transition"
            >
              ▶ Tonton Sekarang
            </router-link>
          </div>
        </div>
      </section>

      <!-- GENRE -->
      <section class="max-w-7xl mx-auto px-4 mt-10">

        <h2
          class="text-2xl font-bold text-[#2D2A26] mb-5"
        >
          Jelajahi Genre
        </h2>

        <div class="flex flex-wrap gap-3">

          <router-link
            v-for="g in store.genres"
            :key="g.id"
            :to="{ name: 'genre', params: { name: g.name } }"
            class="
            px-5 py-2.5
            rounded-full
            bg-white/40
            backdrop-blur-xl
            border border-white/50
            text-[#2D2A26]
            hover:bg-[#C8A27C]
            hover:text-white
            transition-all duration-300
            shadow-sm"
          >
            {{ g.name }}
          </router-link>

        </div>
      </section>

      <!-- MOVIES -->
      <section class="max-w-7xl mx-auto px-4 mt-10 pb-12">

        <div
          class="
          rounded-[32px]
          bg-white/30
          backdrop-blur-xl
          border border-white/50
          shadow-lg
          p-6"
        >
          <MovieGrid
            :movies="store.movies"
            title="Film Terbaru"
          />
        </div>

      </section>

    </template>

  </div>
</template>
