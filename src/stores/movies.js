// File ini diletakkan di: src/stores/movies.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as movieService from '@/services/movieService'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref([])
  const featured = ref([])
  const genres = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchAll() {
    loading.value = true; error.value = null
    try {
      movies.value = await movieService.getMovies()
      featured.value = await movieService.getFeaturedMovies()
      genres.value = await movieService.getGenres()
    } catch (e) {
      error.value = e.message
    } finally { loading.value = false }
  }

  async function fetchByGenre(name) {
    loading.value = true; error.value = null
    try { return await movieService.getMoviesByGenre(name) }
    catch (e) { error.value = e.message; return [] }
    finally { loading.value = false }
  }

  async function search(query) {
    loading.value = true; error.value = null
    try { return await movieService.searchMovies(query) }
    catch (e) { error.value = e.message; return [] }
    finally { loading.value = false }
  }

  return { movies, featured, genres, loading, error, fetchAll, fetchByGenre, search }
})
