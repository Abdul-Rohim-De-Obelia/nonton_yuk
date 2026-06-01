// File ini diletakkan di: src/services/movieService.js
import { supabase } from './supabase'

// Ambil semua film (opsional limit)
export async function getMovies(limit = 50) {
  const { data, error } = await supabase
    .from('movies').select('*, genres(name)')
    .order('created_at', { ascending: false }).limit(limit)
  if (error) throw error
  return data
}

// Ambil 1 film berdasarkan id
export async function getMovieById(id) {
  const { data, error } = await supabase
    .from('movies').select('*, genres(name)').eq('id', id).single()
  if (error) throw error
  return data
}

// Ambil film unggulan (featured)
export async function getFeaturedMovies() {
  const { data, error } = await supabase
    .from('movies').select('*').eq('featured', true).limit(5)
  if (error) throw error
  return data
}

// Ambil film berdasarkan genre
export async function getMoviesByGenre(genreName) {
  const { data, error } = await supabase
    .from('movies').select('*, genres!inner(name)')
    .eq('genres.name', genreName)
  if (error) throw error
  return data
}

// Pencarian film berdasarkan judul
export async function searchMovies(query) {
  const { data, error } = await supabase
    .from('movies').select('*').ilike('title', `%${query}%`)
  if (error) throw error
  return data
}

// Ambil daftar genre
export async function getGenres() {
  const { data, error } = await supabase.from('genres').select('*').order('name')
  if (error) throw error
  return data
}
