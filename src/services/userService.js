// File ini diletakkan di: src/services/userService.js
import { supabase } from './supabase'

// === FAVORITES ===
export async function getFavorites(userId) {
  const { data, error } = await supabase
    .from('favorites').select('*, movies(*)').eq('user_id', userId)
  if (error) throw error
  return data
}

export async function addFavorite(userId, movieId) {
  const { error } = await supabase.from('favorites').insert({ user_id: userId, movie_id: movieId })
  if (error) throw error
}

export async function removeFavorite(userId, movieId) {
  const { error } = await supabase.from('favorites')
    .delete().eq('user_id', userId).eq('movie_id', movieId)
  if (error) throw error
}

export async function isFavorite(userId, movieId) {
  const { data } = await supabase.from('favorites')
    .select('id').eq('user_id', userId).eq('movie_id', movieId).maybeSingle()
  return !!data
}

// === WATCH HISTORY ===
export async function getWatchHistory(userId) {
  const { data, error } = await supabase
    .from('watch_history').select('*, movies(*)')
    .eq('user_id', userId).order('watched_at', { ascending: false })
  if (error) throw error
  return data
}

export async function recordWatch(userId, movieId) {
  // upsert agar 1 film tidak duplikat, hanya update waktu
  const { error } = await supabase.from('watch_history')
    .upsert({ user_id: userId, movie_id: movieId, watched_at: new Date().toISOString() },
            { onConflict: 'user_id,movie_id' })
  if (error) throw error
}

// === PROFILE ===
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles').select('*').eq('id', userId).single()
  if (error) throw error
  return data
}

export async function updateProfile(userId, updates) {
  const { error } = await supabase.from('profiles').update(updates).eq('id', userId)
  if (error) throw error
}
