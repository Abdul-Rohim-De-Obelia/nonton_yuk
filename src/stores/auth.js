// File ini diletakkan di: src/stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/services/supabase'

const ADMIN_EMAILS = [
  '2337051@students.upp.ac.id',
  // tambahkan email admin lain di sini nanti
]

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => ADMIN_EMAILS.includes(user.value?.email))

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

  return { user, loading, isLoggedIn, isAdmin, init, register, login, logout }
})
