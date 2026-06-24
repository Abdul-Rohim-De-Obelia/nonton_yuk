
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/services/supabase'

const stats = ref({ movies: 0, genres: 0 })
const recentMovies = ref([])
const loading = ref(true)

onMounted(async () => {
  const [{ count: movieCount }, { count: genreCount }, { data: recent }] = await Promise.all([
    supabase.from('movies').select('*', { count: 'exact', head: true }),
    supabase.from('genres').select('*', { count: 'exact', head: true }),
    supabase.from('movies').select('id, title, year, rating, created_at').order('created_at', { ascending: false }).limit(5)
  ])
  stats.value = { movies: movieCount ?? 0, genres: genreCount ?? 0 }
  recentMovies.value = recent ?? []
  loading.value = false
})
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-brown mb-6">Dashboard</h2>

    <!-- Stat cards -->
    <div class="grid grid-cols-2 gap-6 mb-8" v-if="!loading">
      <div class="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
        <div class="text-4xl">🎬</div>
        <div>
          <p class="text-3xl font-bold text-brown">{{ stats.movies }}</p>
          <p class="text-brown-soft text-sm">Total Film</p>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
        <div class="text-4xl">🏷️</div>
        <div>
          <p class="text-3xl font-bold text-brown">{{ stats.genres }}</p>
          <p class="text-brown-soft text-sm">Total Genre</p>
        </div>
      </div>
    </div>

    <!-- Skeleton loading -->
    <div class="grid grid-cols-2 gap-6 mb-8" v-else>
      <div v-for="i in 2" :key="i" class="bg-white rounded-xl shadow-sm p-6 h-24 animate-pulse bg-gray-100"></div>
    </div>

    <!-- Film terbaru -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-brown">Film Terbaru Ditambahkan</h3>
        <router-link to="/admin/movies" class="text-accent text-sm hover:underline">Lihat semua →</router-link>
      </div>
      <div v-if="loading" class="space-y-3">
        <div v-for="i in 5" :key="i" class="h-8 bg-gray-100 rounded animate-pulse"></div>
      </div>
      <table class="w-full text-sm" v-else>
        <thead>
          <tr class="text-left text-brown-soft border-b">
            <th class="pb-2 font-medium">Judul</th>
            <th class="pb-2 font-medium">Tahun</th>
            <th class="pb-2 font-medium">Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in recentMovies" :key="movie.id" class="border-b last:border-0">
            <td class="py-2 font-medium text-brown">{{ movie.title }}</td>
            <td class="py-2 text-brown-soft">{{ movie.year }}</td>
            <td class="py-2">
              <span class="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-medium">
                ⭐ {{ movie.rating }}
              </span>
            </td>
          </tr>
          <tr v-if="recentMovies.length === 0">
            <td colspan="3" class="py-4 text-center text-brown-soft">Belum ada film.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
