<!-- File ini diletakkan di: src/views/GenreView.vue -->
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMoviesStore } from '@/stores/movies'
import MovieGrid from '@/components/movie/MovieGrid.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const route = useRoute()
const store = useMoviesStore()
const list = ref([])
const loading = ref(true)

async function load() {
  loading.value = true
  list.value = await store.fetchByGenre(route.params.name)
  loading.value = false
}
onMounted(load)
watch(() => route.params.name, load)
</script>

<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <MovieGrid v-else :movies="list" :title="`Genre: ${route.params.name}`" />
  </div>
</template>
