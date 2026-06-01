// File ini diletakkan di: src/stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/services/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const isLoggedIn = computed(() => !!user.value)

  // Pulihkan sesi & pantau perubahan auth
  async function init() {
    const { data } = await supabase.auth.getSession()
    user.value = data.session?.user ?? null
    supabase.auth.onAuthStateChange((_e, session) => {
      user.value = session?.user ?? null
    })
  }

  async function register(email, password, fullName) {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signUp({
        email, password, options: { data: { full_name: fullName } }
      })
      if (error) throw error
      user.value = data.user
    } finally { loading.value = false }
  }

  async function login(email, password) {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      user.value = data.user
    } finally { loading.value = false }
  }

  async function logout() {
    await supabase.auth.signOut()
    user.value = null
  }

  return { user, loading, isLoggedIn, init, register, login, logout }
})
