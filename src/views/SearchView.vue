<!-- File ini diletakkan di: src/views/SearchView.vue -->
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMoviesStore } from '@/stores/movies'
import MovieGrid from '@/components/movie/MovieGrid.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const route = useRoute()
const store = useMoviesStore()
const results = ref([])
const loading = ref(false)

async function run() {
  const q = route.query.q
  if (!q) { results.value = []; return }
  loading.value = true
  results.value = await store.search(q)
  loading.value = false
}
onMounted(run)
watch(() => route.query.q, run)
</script>

<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <MovieGrid v-else :movies="results" :title="`Hasil pencarian: &quot;${route.query.q}&quot;`" />
  </div>
</template>
